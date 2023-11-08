<?php

use App\Http\Controllers\RegistroController;
use App\Http\Controllers\Validacoes;
use App\Http\Controllers\GrupoCidadeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\UsuariosController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/registros', [RegistroController::class, 'inserir']);
Route::get('/registros', [RegistroController::class, 'lerTodos']);
Route::get('/registros/tipo', [RegistroController::class, 'lerTipoProdutos']);
Route::get('/imagem/{pasta}/{nome}', [RegistroController::class, 'exibirImagem']);
Route::put('/registros', [RegistroController::class, 'atualizar']);
Route::delete('/registros/{id}', [RegistroController::class, 'excluir']);
Route::post('/registros/salvarImagem', [RegistroController::class, 'salvarImagem']);
Route::post('/registros/validaLogin', [Validacoes::class, 'validaLogin']);
Route::post('/usuario', [UsuariosController::class, 'inserir']);
Route::post('/grupos', [GrupoCidadeController::class, 'createGroupAndCity']);
Route::put('/grupos/{groupId}', [GrupoCidadeController::class, 'editGroup']);
Route::get('/grupos', [GrupoCidadeController::class, 'getAllGroupsWithCities']);
Route::delete('/grupos/{groupId}', [GrupoCidadeController::class, 'deleteGroup']);
Route::get('/cidades', [GrupoCidadeController::class, 'getAllCities']);
Route::get('/users', [UserController::class, 'getAll']);
Route::get('/users/{userId}', [UserController::class, 'getUserById']);
Route::put('/users/{userId}', [UserController::class, 'updateUser']);


/*
|--------------------------------------------------------------------------
| Teste de conexão com o banco de dados
|--------------------------------------------------------------------------
*/
Route::get('/test-db-connection', function () {
    try {
        $connection = app('db')->connection();
        $connection->getPdo();
        return 'Conexão ao banco de dados bem-sucedida.';
    } catch (\Exception $e) {
        return 'Erro na conexão ao banco de dados: ' . $e->getMessage();
    }
});
