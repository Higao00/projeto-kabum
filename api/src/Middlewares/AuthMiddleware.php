<?php

namespace App\AuthMiddleware;

use Firebase\JWT\JWT;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class AuthMiddleware
{
    private $secretKey;

    public function __construct($secretKey = 'your_secret_key')
    {
        $this->secretKey = $secretKey;
    }

    public function __invoke(Request $request, Response $response, callable $next)
    {
        // Verifica se o cabeçalho de autorização está presente
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
            $response->getBody()->write(json_encode(['error' => 'Authorization header not found']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $arr = explode(" ", $authHeader);

        if (count($arr) != 2) {
            $response->getBody()->write(json_encode(['error' => 'Authorization header malformed']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        list($jwt) = $arr;

        try {
            // Decodifica o JWT
            $decoded = JWT::decode($jwt, $this->secretKey, null);

            // O JWT foi decodificado corretamente, vamos adicionar os dados ao request
            $request = $request->withAttribute('user', $decoded);
        } catch (\Firebase\JWT\ExpiredException $e) {
            $response->getBody()->write(json_encode(['error' => 'Token expired']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            $response->getBody()->write(json_encode(['error' => 'Invalid token signature']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => 'Invalid or malformed token']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        return $next($request, $response);
    }
}
