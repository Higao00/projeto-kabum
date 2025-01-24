<?php

namespace App\Controllers;

use App\Models\ModelsAddress;

class AddressController
{
    private $pdo;
    private $addressModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->addressModel = new ModelsAddress($this->pdo);
    }

    // Criar endereço
    public function createAddress($request, $response, $args)
    {
        $data = $request->getParsedBody();

        $client_id = $data['client_id'];
        $cep = $data['cep'];
        $logradouro = $data['logradouro'];
        $bairro = $data['bairro'];
        $localidade = $data['localidade'];
        $cidade = $data['cidade'];
        $uf = $data['uf'];

        if (empty($client_id) || empty($cep) || empty($logradouro) || empty($bairro) || empty($localidade) || empty($cidade) || empty($uf)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->addressModel->createAddress($client_id, $cep, $logradouro, $bairro, $localidade, $cidade, $uf);

        return $response->withJson(['message' => 'Address created successfully'], 201);
    }

    // Obter endereços por ID do cliente
    public function getAddressesByClientId($request, $response, $args)
    {
        $clientId = $args['client_id'];
        $addresses = $this->addressModel->getAddressesByClientId($clientId);

        $addressArray = [];
        while ($address = $addresses->fetch()) {
            $addressArray[] = $address;
        }

        return $response->withJson($addressArray, 200);
    }

    // Atualizar endereço
    public function updateAddress($request, $response, $args)
    {
        $id = $args['id'];
        $data = $request->getParsedBody();

        $cep = $data['cep'];
        $logradouro = $data['logradouro'];
        $bairro = $data['bairro'];
        $localidade = $data['localidade'];
        $cidade = $data['cidade'];
        $uf = $data['uf'];

        if (empty($cep) || empty($logradouro) || empty($bairro) || empty($localidade) || empty($cidade) || empty($uf)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->addressModel->updateAddress($id, $cep, $logradouro, $bairro, $localidade, $cidade, $uf);

        return $response->withJson(['message' => 'Address updated successfully'], 200);
    }

    // Excluir endereço
    public function deleteAddress($request, $response, $args)
    {
        $id = $args['id'];
        $address = $this->addressModel->getAddressesByClientId($id);

        if (!$address) {
            return $response->withJson(['error' => 'Address not found'], 404);
        }

        $this->addressModel->deleteAddress($id);

        return $response->withJson(['message' => 'Address deleted successfully'], 200);
    }
}
