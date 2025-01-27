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
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Cabeçalho de autorização não encontrado.']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $arr = explode(" ", $authHeader);

        if (count($arr) != 2) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Cabeçalho de autorização malformado.']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $jwt = $arr[1];

        try {
            $decoded = JWT::decode($jwt, new Key($this->secretKey, 'HS256'));
            $request = $request->withAttribute('user', $decoded);
        } catch (\Firebase\JWT\ExpiredException $e) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Token expirado.']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Assinatura do token inválida.']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Token inválido ou malformado.']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        return $handler->handle($request);
    }
}
