<?php

use App\Config\Database;
use Psr\Container\ContainerInterface;
use App\Controllers\UserController;

return function (ContainerInterface $container) {
    $container['pdo'] = function ($container) {
        $database = new Database();
        return $database->getConnection();
    };

    $container[UserController::class] = function ($container) {
        return new UserController($container->get('pdo'));
    };
};
