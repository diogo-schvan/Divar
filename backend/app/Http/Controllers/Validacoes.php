<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CRUD\Util;
use Firebase\JWT\JWT;

class Validacoes extends Controller
{

    public function validaLogin(Request $request)
    {
        $senha = $request['senha'];
        $cpf = $request['cpf'];
        try {
            $registros = Util::buscaUsuario($cpf);

            if (!empty($registros)) {
                foreach ($registros as $registro) {
                    // Acessa a senha de cada registro
                    $senhaDoRegistro = $registro->senha;

                    if ($senhaDoRegistro == md5($senha)) {
                        $userData = [
                            'id' => $registro->id,
                            'nome' => $registro->nome_completo,
                            'cpf' => $registro->cpf,
                            'tipo_usuario' => $registro->tipo_usuario,
                        ];

                        $secretKey = env('JWT_SECRET_ACCESS_KEY');

                        $jwtOptions = [
                            'issuer' => 'divar_semijoias.com',
                            'audience' => 'divar_semijoias.com',
                            'expiresInSeconds' => 3600, // expira em 1 hora
                        ];

                        $jwt = JWT::encode($userData, $secretKey, 'HS256', null, $jwtOptions);

                        return response()->json(['message' => 'Autenticado', 'token' => $jwt]);
                    } else {
                        return response()->json(['message' => 'Senha Errada']);
                    }
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar todos os registros'], 500);
        }
    }
}
