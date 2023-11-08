<?php

namespace App\Models\CRUD;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Util extends Model
{
    use HasFactory;

    public static function criarRegistro(array $dados)
    {
        try {
            $table = $dados['table'];
            unset($dados['table']);

            return  DB::table($table)->insert($dados);
        } catch (QueryException $e) {
            // Se ocorrer um erro, você pode acessar a mensagem de erro da exceção
            $mensagemDeErro = $e->getMessage();
            return $mensagemDeErro;
        }
    }

    public static function excluirRegistro($id, $table)
    {
        return  DB::table($table)->where('id', $id)->delete();
    }

    //NÃO IMPLEMENTADO
    public static function buscarRegistro($id)
    {
        return self::findOrFail($id);
    }

    public static function buscarTodosRegistros($table)
    {
        return DB::table($table)->get();
    }

    public static function atualizarRegistro($table, $id, array $dados)
    {
        return DB::table($table)->where('id', $id)->update($dados);
    }

    public static function buscaUsuario($cpf)
    {
        return DB::table('usuarios')
            ->select('id', 'nome_completo', 'cpf', 'senha', 'tipo_usuario')
            ->where('cpf', $cpf)
            ->get()
            ->toArray();
    }
}
