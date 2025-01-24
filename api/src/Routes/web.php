<?php

use Slim\Factory\AppFactory;

use App\AddressController\AddressController;
use App\AddressValidationMiddleware\AddressValidationMiddleware;
use App\AuthMiddleware\AuthMiddleware;
use App\ClientController\ClientController;
use App\ClientValidationMiddleware\ClientValidationMiddleware;
use App\UserController\UserController;
use App\UserValidationMiddleware\UserValidationMiddleware;

$app = AppFactory::create();

// Conectar à base de dados
$pdo = require __DIR__ . '../../../config/Database.php';

// Instâncias dos controladores
$userController = new UserController($pdo);
$clientController = new ClientController($pdo);
$addressController = new AddressController($pdo);

// Instâncias dos middlewares
$authMiddleware = new AuthMiddleware();
$userValidationMiddleware = new UserValidationMiddleware();
$clientValidationMiddleware = new ClientValidationMiddleware();
$addressValidationMiddleware = new AddressValidationMiddleware();

// Rotas de Usuários
$app->post('/register', [$userController, 'register']);
$app->post('/login', [$userController, 'login']);

// Rotas de Usuários (requere autenticação)
$app->group('/users', function () use ($app, $userController) {
    $app->get('', [$userController, 'getAllUsers']);
    $app->get('/{id}', [$userController, 'getUserById']);
    $app->put('/{id}', [$userController, 'updateUser']);
    $app->delete('/{id}', [$userController, 'deleteUser']);
})->add($authMiddleware); // Adicionar o middleware de autenticação

// Rotas de Clientes (requere autenticação e validação)
$app->group('/clients', function () use ($app, $clientController, $clientValidationMiddleware) {
    $app->post('', [$clientValidationMiddleware, '__invoke'], [$clientController, 'createClient']);
    $app->get('', [$clientController, 'getAllClients']);
    $app->get('/{id}', [$clientController, 'getClientById']);
    $app->put('/{id}', [$clientValidationMiddleware, '__invoke'], [$clientController, 'updateClient']);
    $app->delete('/{id}', [$clientController, 'deleteClient']);
})->add($authMiddleware); // Adicionar o middleware de autenticação

// Rotas de Endereços (requere autenticação e validação)
$app->group('/addresses', function () use ($app, $addressController, $addressValidationMiddleware) {
    $app->post('', [$addressValidationMiddleware, '__invoke'], [$addressController, 'createAddress']);
    $app->get('/{clientId}', [$addressController, 'getAddressesByClientId']);
    $app->put('/{id}', [$addressValidationMiddleware, '__invoke'], [$addressController, 'updateAddress']);
    $app->delete('/{id}', [$addressController, 'deleteAddress']);
})->add($authMiddleware); // Adicionar o middleware de autenticação

return $app;
