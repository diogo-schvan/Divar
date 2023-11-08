<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class GrupoCidadeController extends Controller
{
    public function createGroupAndCity(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:50',
            'cidades' => 'required|array',
        ]);

        // Use a database transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Create a group and retrieve its ID
            $group = DB::table('grupos')->insertGetId([
                'nome' => $data['nome'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Create entries in the cidade_grupos table to associate cidades with the group
            $cidadeGruposData = [];
            foreach ($data['cidades'] as $cityId) {
                $cidadeGruposData[] = [
                    'id_cidade' => $cityId,
                    'id_grupo' => $group,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('cidade_grupos')->insert($cidadeGruposData);

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Group and cities created successfully']);
        } catch (\Exception $e) {
            // Something went wrong, so rollback the transaction
            DB::rollback();

            return response()->json(['error' => 'An error occurred while creating the group and cities'], 500);
        }
    }

    public function editGroup(Request $request, $groupId)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:50',
            'cidades' => 'required|array',
        ]);

        // Use a database transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Update the group's name
            DB::table('grupos')
                ->where('id', $groupId)
                ->update([
                    'nome' => $data['nome'],
                    'updated_at' => now(),
                ]);

            // Delete existing "cidade_grupos" records for the group
            DB::table('cidade_grupos')
                ->where('id_grupo', $groupId)
                ->delete();

            // Create new "cidade_grupos" records for the updated cidades
            $cidadeGruposData = [];
            foreach ($data['cidades'] as $cityId) {
                $cidadeGruposData[] = [
                    'id_cidade' => $cityId,
                    'id_grupo' => $groupId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('cidade_grupos')->insert($cidadeGruposData);

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Group updated successfully']);
        } catch (\Exception $e) {
            // Something went wrong, so rollback the transaction
            DB::rollback();

            return response()->json(['error' => 'An error occurred while updating the group'], 500);
        }
    }

    public function getAllGroupsWithCities()
    {
        $groups = DB::table('grupos')
            ->join('cidade_grupos', 'grupos.id', '=', 'cidade_grupos.id_grupo')
            ->join('cidades', 'cidade_grupos.id_cidade', '=', 'cidades.id')
            ->select('grupos.id as id', 'grupos.nome as nome', 'cidades.id as cidade_id', 'cidades.nome as nome_cidade')
            ->get();

        // Organize the result into an array of objects
        $result = [];

        foreach ($groups as $group) {
            $groupId = $group->id;
            $groupName = $group->nome;
            $cityId = $group->cidade_id;
            $cityName = $group->nome_cidade;

            // Check if the group already exists in the result array
            $groupIndex = array_search($groupId, array_column($result, 'id'));

            // If the group doesn't exist, add it with an empty array for cities
            if ($groupIndex === false) {
                $result[] = ['id' => $groupId, 'nome' => $groupName, 'cidades' => []];
                $groupIndex = count($result) - 1;
            }

            // Add the city to the group's cities array
            $result[$groupIndex]['cidades'][] = ['id' => $cityId, 'nome' => $cityName];
        }

        return response()->json(['grupos' => $result]);
    }

    public function deleteGroup($groupId)
    {
        // Use a database transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Delete all "cidade_grupos" records associated with the group
            DB::table('cidade_grupos')
                ->where('id_grupo', $groupId)
                ->delete();

            // Delete the group itself
            DB::table('grupos')
                ->where('id', $groupId)
                ->delete();

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Group and associated cidade_grupos deleted successfully']);
        } catch (\Exception $e) {
            // Something went wrong, so rollback the transaction
            DB::rollback();

            return response()->json(['error' => 'An error occurred while deleting the group and cidade_grupos'], 500);
        }
    }

    public function getAllCities()
    {
        // Use the DB facade to fetch all cities from the "cidades" table
        $cities = DB::table('cidades')->select('id', 'nome')->get();

        return response()->json(['cidades' => $cities]);
    }
}
