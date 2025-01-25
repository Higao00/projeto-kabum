<?php

namespace App\Middlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Exception\HttpNotFoundException;
use Slim\Exception\HttpMethodNotAllowedException;
use Throwable;

class ErrorHandlerMiddleware
{
    public static function register($app)
    {
        // Middleware de erros
        $errorMiddleware = $app->addErrorMiddleware(true, true, true);

        // Tratamento para rotas não encontradas (404)
        $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (
            Request $request,
            Throwable $exception,
            bool $displayErrorDetails
        ) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode([
                'error' => true,
                'message' => 'Rota não encontrada.',
            ], JSON_UNESCAPED_UNICODE));

            return $response->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        });

        // Tratamento para métodos HTTP não permitidos (405)
        $errorMiddleware->setErrorHandler(HttpMethodNotAllowedException::class, function (
            Request $request,
            Throwable $exception,
            bool $displayErrorDetails
        ) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode([
                'error' => true,
                'message' => 'Método HTTP não permitido para essa rota.',
            ], JSON_UNESCAPED_UNICODE));

            return $response->withHeader('Content-Type', 'application/json')
                ->withStatus(405);
        });
    }
}
