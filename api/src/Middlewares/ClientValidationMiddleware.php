<?php

namespace App\Middlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface as Response;

class ClientValidationMiddleware
{
    public function __invoke(Request $request, Handler $handler): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $method = $request->getMethod();

        $requiredFieldsPost = [
            'name' => 'string',
            'dob' => 'string',
            'cpf' => 'string',
            'rg' => 'string',
            'phone' => 'string',
        ];

        $requiredFieldsPut = [
            'name' => 'string',
            'dob' => 'string',
            'cpf' => 'string',
            'rg' => 'string',
            'phone' => 'string',
        ];

        if ($method === 'POST') {
            foreach ($requiredFieldsPost as $field => $type) {
                if (!isset($data[$field])) {
                    return $this->errorResponse("O campo '$field' é obrigatório");
                }
                if (!$this->isValidType($data[$field], $type)) {
                    return $this->errorResponse("O campo '$field' deve ser do tipo $type");
                }
            }
        }

        if (in_array($method, ['PUT', 'PATCH'])) {
            foreach ($requiredFieldsPut as $field => $type) {
                if (!isset($data[$field])) {
                    return $this->errorResponse("O campo '$field' é obrigatório");
                }
                if (!$this->isValidType($data[$field], $type)) {
                    return $this->errorResponse("O campo '$field' deve ser do tipo $type");
                }
            }

            foreach ($data as $key => $value) {
                if (!array_key_exists($key, $requiredFieldsPut)) {
                    return $this->errorResponse("O campo '$key' não é permitido");
                }
            }
        }

        return $handler->handle($request);
    }

    private function isValidType($value, string $type): bool
    {
        switch ($type) {
            case 'string':
                return is_string($value);
            case 'boolean':
                return is_bool($value) || in_array($value, [0, 1], true);
            case 'integer':
                return is_int($value) || ctype_digit($value);
            default:
                return false;
        }
    }

    private function errorResponse(string $message): Response
    {
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(['message' => $message]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }
}
