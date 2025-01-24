<?php

use App\Controllers\UserController;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\UserValidationMiddleware;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

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




$app->run();
