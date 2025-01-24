<?php

use Slim\Factory\AppFactory;
use Psr\Container\ContainerInterface;
use UserController;

$app = AppFactory::create();

// Conectar à base de dados
$pdo = require __DIR__ . '/../config/db.php';

$userController = new UserController($pdo);

// Rotas
$app->post('/register', [$userController, 'register']);
$app->post('/login', [$userController, 'login']);

return $app;
