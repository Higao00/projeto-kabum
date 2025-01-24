<?php

require __DIR__ . '/../vendor/autoload.php'; // Corrigir caminho do autoload

use Slim\Factory\AppFactory;
use App\Controllers\AddressController;
use App\Controllers\ClientController;
use App\Controllers\UserController;
use App\Middlewares\AddressValidationMiddleware;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\ClientValidationMiddleware;
use App\Middlewares\UserValidationMiddleware;
use App\Config\Database;

$app = AppFactory::create();

// Criar instância do banco de dados
$database = new Database();
$pdo = $database->getConnection();

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
    $app->get('/{id:\d+}', [$userController, 'getUserById']); // Especifica que {id} deve ser um número
    $app->put('/{id:\d+}', [$userController, 'updateUser']); // Especifica que {id} deve ser um número
    $app->delete('/{id:\d+}', [$userController, 'deleteUser']); // Especifica que {id} deve ser um número
})->add($authMiddleware); // Adicionar o middleware de autenticação

// Rotas de Clientes (requere autenticação e validação)
$app->group('/clients', function () use ($app, $clientController, $clientValidationMiddleware) {
    $app->post('', [$clientValidationMiddleware, '__invoke'], [$clientController, 'createClient']);
    $app->get('', [$clientController, 'getAllClients']); // Corrigido para '/clients' sem parâmetro id
    $app->get('/{id:\d+}', [$clientController, 'getClientById']); // Especifica que {id} deve ser um número
    $app->put('/{id:\d+}', [$clientValidationMiddleware, '__invoke'], [$clientController, 'updateClient']);
    $app->delete('/{id:\d+}', [$clientController, 'deleteClient']);
})->add($authMiddleware); // Adicionar o middleware de autenticação

// Rotas de Endereços (requere autenticação e validação)
$app->group('/addresses', function () use ($app, $addressController, $addressValidationMiddleware) {
    $app->post('', [$addressValidationMiddleware, '__invoke'], [$addressController, 'createAddress']);
    $app->get('/{clientId:\d+}', [$addressController, 'getAddressesByClientId']); // Especifica que {clientId} deve ser um número
    $app->put('/{id:\d+}', [$addressValidationMiddleware, '__invoke'], [$addressController, 'updateAddress']);
    $app->delete('/{id:\d+}', [$addressController, 'deleteAddress']);
})->add($authMiddleware); // Adicionar o middleware de autenticação

$app->run();
