<?php

namespace App\Middlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface as Response;

class UserValidationMiddleware
{
    public function __invoke(Request $request, Handler $handler): Response
    {
        // Pegando os dados da requisição
        $data = json_decode($request->getBody()->getContents(), true);

        // Verificando o método HTTP
        $method = $request->getMethod();

        // Campos obrigatórios e seus tipos esperados para criação
        $requiredFieldsPost = [
            'name' => 'string',
            'email' => 'string',
            'password' => 'string',
            'status' => 'boolean'
        ];

        // Campos obrigatórios e permitidos para edição
        $requiredFieldsPut = [
            'name' => 'string',
            'email' => 'string',
            'status' => 'boolean'
        ];

        if ($method === 'POST') {
            // Validação para criação
            foreach ($requiredFieldsPost as $field => $type) {
                if (!isset($data[$field])) {
                    return $this->errorResponse("Field '$field' is required");
                }
                if (!$this->isValidType($data[$field], $type)) {
                    return $this->errorResponse("Field '$field' must be of type $type");
                }
            }
        }

        if (in_array($method, ['PUT', 'PATCH'])) {
            // Validação para edição
            foreach ($requiredFieldsPut as $field => $type) {
                if (!isset($data[$field])) {
                    return $this->errorResponse("Field '$field' is required");
                }
                if (!$this->isValidType($data[$field], $type)) {
                    return $this->errorResponse("Field '$field' must be of type $type");
                }
            }

            // Validação adicional: não permitir campos extras
            foreach ($data as $key => $value) {
                if (!array_key_exists($key, $requiredFieldsPut)) {
                    return $this->errorResponse("Field '$key' is not allowed");
                }
            }
        }

        // Continuando para o próximo middleware ou controlador
        return $handler->handle($request);
    }

    /**
     * Valida se o tipo do valor corresponde ao tipo esperado.
     */
    private function isValidType($value, string $type): bool
    {
        switch ($type) {
            case 'string':
                return is_string($value);
            case 'boolean':
                return is_bool($value) || in_array($value, [0, 1], true); // Compatível com TINYINT
            case 'integer':
                return is_int($value) || ctype_digit($value); // Verifica strings numéricas
            default:
                return false;
        }
    }

    /**
     * Retorna uma resposta de erro padronizada.
     */
    private function errorResponse(string $message): Response
    {
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(['error' => $message]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }
}
