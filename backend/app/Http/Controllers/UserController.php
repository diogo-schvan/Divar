<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getAll()
    {
        try {
            // Use the DB facade to fetch all users with an inner join on cidade and grupo
            $users = DB::table('usuarios')
                ->select('usuarios.id', 'usuarios.nome_completo', 'usuarios.cpf', 'usuarios.data_nascimento', 'usuarios.endereco', 'usuarios.telefone', 'usuarios.tipo_usuario', 'cidades.id as cidade_id', 'cidades.nome as cidade_nome', 'grupos.id as grupo_id', 'grupos.nome as grupo_nome', 'usuarios.limite_produtos')
                ->join('cidades', 'usuarios.id_cidade', '=', 'cidades.id')
                ->join('grupos', 'usuarios.id_grupo', '=', 'grupos.id')
                ->get();
    
            return response()->json(['usuarios' => $users]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching the users'], 500);
        }
    }

    public function getUserById($userId)
    {
        try {
            // Use the DB facade to fetch the user by their id with an inner join on cidade and grupo
            $user = DB::table('usuarios')
                ->select('usuarios.id', 'usuarios.nome_completo', 'usuarios.cpf', 'usuarios.data_nascimento', 'usuarios.endereco', 'usuarios.telefone', 'usuarios.tipo_usuario', 'cidades.id as cidade_id', 'cidades.nome as cidade_nome', 'grupos.id as grupo_id', 'grupos.nome as grupo_nome', 'usuarios.limite_produtos')
                ->join('cidades', 'usuarios.id_cidade', '=', 'cidades.id')
                ->join('grupos', 'usuarios.id_grupo', '=', 'grupos.id')
                ->where('usuarios.id', $userId)
                ->first();
    
            if ($user) {
                return response()->json(['usuario' => $user]);
            } else {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching the user'], 500);
        }
    }

    public function updateUser(Request $request, $userId)
    {
        // Validate the input data, you can add more validation rules as needed
        $request->validate([
            'id_grupo' => 'integer', // Validate id_grupo as an integer
            'limite_produtos' => 'integer', // Validate limite_produtos as an integer
        ]);

        try {
            // Update the user's id_grupo and limite_produtos based on the request data
            DB::table('usuarios')
                ->where('id', $userId)
                ->update([
                    'id_grupo' => $request->input('id_grupo'),
                    'limite_produtos' => $request->input('limite_produtos'),
                ]);

            return response()->json(['message' => 'User updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the user'], 500);
        }
    }
}
