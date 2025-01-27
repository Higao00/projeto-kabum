<?php

namespace App\Middlewares;

class ValidationMiddleware
{
    private $fields;

    public function __construct($fields)
    {
        $this->fields = $fields;
    }

    public function __invoke($request, $response, $next)
    {
        $data = $request->getParsedBody();

        foreach ($this->fields as $field) {
            if (empty($data[$field])) {
                return $response->withJson(['message' => "O campo '$field' é obrigatório"], 400);
            }
        }

        $response = $next($request, $response);

        return $response;
    }
}
