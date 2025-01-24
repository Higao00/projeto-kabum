<?php

namespace App\Middlewares;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class AuthMiddleware implements MiddlewareInterface
{
    private $secretKey;

    public function __construct($secretKey = 'your_secret_key')
    {
        $this->secretKey = $secretKey;
    }

    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        // Verifica se o cabeçalho de autorização está presente
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Authorization header not found']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $arr = explode(" ", $authHeader);

        if (count($arr) != 2) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Authorization header malformed']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $jwt = $arr[1]; // Obtém o token JWT

        try {
            // Decodifica o JWT
            $decoded = JWT::decode($jwt, new Key($this->secretKey, 'HS256'));

            // Adiciona os dados do usuário ao request
            $request = $request->withAttribute('user', $decoded);
        } catch (\Firebase\JWT\ExpiredException $e) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Token expired']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Invalid token signature']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Invalid or malformed token']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Continua para o próximo middleware ou controlador
        return $handler->handle($request);
    }
}
