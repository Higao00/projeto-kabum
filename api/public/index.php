<?php

use App\Controllers\AddressController;
use App\Controllers\ClientController;
use App\Controllers\UserController;
use App\Middlewares\AddressValidationMiddleware;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\ClientValidationMiddleware;
use App\Middlewares\ErrorHandlerMiddleware;
use App\Middlewares\UserValidationMiddleware;

use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Registrar o tratamento de erros
ErrorHandlerMiddleware::register($app);

// Rota de login (não precisa de autenticação)
$app->post('/api/login', function ($request, $response, $args) use ($app) {
    $userController = new UserController();
    return $userController->login($request, $response, $args);
});

$app->group('/api/users', function (RouteCollectorProxy $group) {
    $group->post('/create', function ($request, $response, array $args) {
        $userController = new UserController();
        return $userController->register($request, $response, $args);
    })->add(new UserValidationMiddleware());

    $group->put('/{id}', function ($request, $response, array $args) {
        $userController = new UserController();
        return $userController->updateUser($request, $response, $args);
    })->add(new UserValidationMiddleware());

    $group->get('/all', function ($request, $response, array $args) {
        $userController = new UserController();
        return $userController->getAllUsers($request, $response, $args);
    });

    $group->get('/{id}', function ($request, $response, array $args) {
        $userController = new UserController();
        return $userController->getUserById($request, $response, $args);
    });

    $group->delete('/{id}', function ($request, $response, array $args) {
        $userController = new UserController();
        return $userController->deleteUser($request, $response, $args);
    });
})->add(new AuthMiddleware());

$app->group('/api/clients', function (RouteCollectorProxy $group) {
    $group->post('/create', function ($request, $response, array $args) {
        $clientController = new ClientController();
        return $clientController->register($request, $response, $args);
    })->add(new ClientValidationMiddleware());

    $group->put('/{id}', function ($request, $response, array $args) {
        $clientController = new ClientController();
        return $clientController->updateClient($request, $response, $args);
    })->add(new ClientValidationMiddleware());

    $group->get('/all', function ($request, $response, array $args) {
        $clientController = new ClientController();
        return $clientController->getAllClients($request, $response, $args);
    });

    $group->get('/{id}', function ($request, $response, array $args) {
        $clientController = new ClientController();
        return $clientController->getClientById($request, $response, $args);
    });

    $group->delete('/{id}', function ($request, $response, array $args) {
        $clientController = new ClientController();
        return $clientController->deleteClient($request, $response, $args);
    });
})->add(new AuthMiddleware());

$app->group('/api/address', function (RouteCollectorProxy $group) {
    $group->post('/create', function ($request, $response, array $args) {
        $addressController = new AddressController();
        return $addressController->createAddress($request, $response, $args);
    })->add(new AddressValidationMiddleware());

    $group->get('/all', function ($request, $response, array $args) {
        $addressController = new AddressController();
        return $addressController->getAllAddresses($request, $response, $args);
    });

    $group->put('/{id}', function ($request, $response, array $args) {
        $addressController = new AddressController();
        return $addressController->updateAddress($request, $response, $args);
    })->add(new AddressValidationMiddleware());

    $group->get('/clientID/{id}', function ($request, $response, array $args) {
        $addressController = new AddressController();
        return $addressController->getAddressesByClientId($request, $response, $args);
    });

    $group->get('/{id}', function ($request, $response, array $args) {
        $addressController = new AddressController();
        return $addressController->getAddressById($request, $response, $args);
    });

    $group->delete('/{id}', function ($request, $response, array $args) {
        $addressController = new AddressController();
        return $addressController->deleteAddress($request, $response, $args);
    });
})->add(new AuthMiddleware());

$app->run();
