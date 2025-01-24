<?php

namespace App\AddressValidationMiddleware;

class AddressValidationMiddleware
{
    public function __invoke($request, $response, $next)
    {
        // Pegando os dados da requisição
        $data = $request->getParsedBody();

        // Verificando se todos os campos necessários estão presentes
        $requiredFields = ['client_id', 'cep', 'logradouro', 'bairro', 'localidade', 'cidade', 'uf'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return $response->withJson(['error' => "Field '$field' is required"], 400);
            }
        }

        // Continuando para o próximo middleware ou controlador
        return $next($request, $response);
    }
}
