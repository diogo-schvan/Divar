<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CRUD\Util;

class UsuariosController extends Controller
{
    public function inserir(Request $request)
    {

        $request['table'] = 'usuarios';

        try {
            $registro = Util::criarRegistro($request->all());
            return response()->json($registro);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao inserir o registro'], 500);
        }
    }
}
