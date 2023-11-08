<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use App\Models\CRUD\Util;

class RegistroController extends Controller
{
    public function inserir(Request $request)
    {

        $request['table'] = 'produtos';

        try {
            $registro = Util::criarRegistro($request->all());
            return response()->json($registro, 201); // 201 Created
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao inserir o registro'], 500);
        }
    }

    public function salvarImagem(Request $request)
    {
        if ($request->hasFile('imagem_produto')) {
            $imagem = $request->file('imagem_produto');
            $nomeOriginal = $imagem->getClientOriginalName();
            $nomeImagem = str_replace(' ', '_', $nomeOriginal);
            $caminhoImagem = public_path('imagens/produtos/' . $nomeImagem);
            Image::make($imagem)->save($caminhoImagem);
            return response()->json(['message' => 'Imagem salva com sucesso']);
        }
    }

    public function exibirImagem($pasta, $nome)
    {
        $caminho = public_path('imagens/' . $pasta . '/' . $nome);
        return response()->file($caminho);
    }

    public function excluir($id)
    {
        try {
            $table = 'produtos';
            $exclusao = Util::excluirRegistro($id, $table);
            return response()->json(['message' => 'Registro excluído com sucesso']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir o registro'], 500);
        }
    }

    public function lerTodos()
    {
        try {
            $table = "produtos";
            $registros = Util::buscarTodosRegistros($table);
            return response()->json($registros);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar todos os registros'], 500);
        }
    }

    public function lerTipoProdutos()
    {
        try {
            $table = "tipo_produtos";
            $registros = Util::buscarTodosRegistros($table);
            return response()->json($registros);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar todos os registros'], 500);
        }
    }

    public function atualizar(Request $request)
    {
        $table = "produtos";
        try {
            $atualizacao = Util::atualizarRegistro($table, $request['id'], $request->all());
            return response()->json($atualizacao);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar o registro'], 500);
        }
    }
}
