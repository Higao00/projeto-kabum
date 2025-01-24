<?php

// src/dependencies.php

use App\Config\Database;
use Psr\Container\ContainerInterface;
use App\Controllers\UserController;

return function (ContainerInterface $container) {
    // Registra a dependência PDO no container
    $container['pdo'] = function ($container) {
        $database = new Database();
        return $database->getConnection();
    };

    // Registra o controlador de usuários no container
    $container[UserController::class] = function ($container) {
        return new UserController($container->get('pdo'));
    };
};
