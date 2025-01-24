<?php

namespace App\Controllers;

use App\Models\ModelsClient;

class ClientController
{
    private $pdo;
    private $clientModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->clientModel = new ModelsClient($this->pdo);
    }

    // Registrar cliente
    public function register($request, $response, $args)
    {
        $data = $request->getParsedBody();

        $name = $data['name'];
        $dob = $data['dob'];
        $cpf = $data['cpf'];
        $rg = $data['rg'];
        $phone = $data['phone'];

        if (empty($name) || empty($dob) || empty($cpf) || empty($rg) || empty($phone)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->clientModel->createClient($name, $dob, $cpf, $rg, $phone);

        return $response->withJson(['message' => 'Client created successfully'], 201);
    }

    // Obter todos os clientes
    public function getAllClients($request, $response, $args)
    {
        $clients = $this->clientModel->getAllClients();
        $clientArray = [];

        while ($client = $clients->fetch()) {
            $clientArray[] = $client;
        }

        return $response->withJson($clientArray, 200);
    }

    // Obter cliente por ID
    public function getClientById($request, $response, $args)
    {
        $id = $args['id'];
        $client = $this->clientModel->getClientById($id);

        if (!$client) {
            return $response->withJson(['error' => 'Client not found'], 404);
        }

        return $response->withJson($client, 200);
    }

    // Atualizar cliente
    public function updateClient($request, $response, $args)
    {
        $id = $args['id'];
        $data = $request->getParsedBody();

        $name = $data['name'];
        $dob = $data['dob'];
        $cpf = $data['cpf'];
        $rg = $data['rg'];
        $phone = $data['phone'];

        if (empty($name) || empty($dob) || empty($cpf) || empty($rg) || empty($phone)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->clientModel->updateClient($id, $name, $dob, $cpf, $rg, $phone);

        return $response->withJson(['message' => 'Client updated successfully'], 200);
    }

    // Excluir cliente
    public function deleteClient($request, $response, $args)
    {
        $id = $args['id'];
        $client = $this->clientModel->getClientById($id);

        if (!$client) {
            return $response->withJson(['error' => 'Client not found'], 404);
        }

        $this->clientModel->deleteClient($id);

        return $response->withJson(['message' => 'Client deleted successfully'], 200);
    }
}
