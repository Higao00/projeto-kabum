<?php

namespace App\Controllers;

use App\Models\ModelsClient;

class ClientController
{
    private $clientModel;

    public function __construct()
    {
        $this->clientModel = new ModelsClient();
    }

    // Registrar cliente
    public function register($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $name = $data['name'] ?? null;
        $dob = $data['dob'] ?? null;
        $cpf = $data['cpf'] ?? null;
        $rg = $data['rg'] ?? null;
        $phone = $data['phone'] ?? null;

        try {
            if (empty($name) || empty($dob) || empty($cpf) || empty($rg) || empty($phone)) {
                throw new \Exception('Missing required fields');
            }

            // Criar o cliente
            $createdClient = $this->clientModel->createClient($name, $dob, $cpf, $rg, $phone);

            // Obter os dados completos do cliente criado
            $fullClientData = $this->clientModel->getClientById($createdClient['id']);

            $response->getBody()->write(json_encode($fullClientData));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    // Obter todos os clientes
    public function getAllClients($request, $response, $args)
    {
        $clients = $this->clientModel->getAllClients();

        $response->getBody()->write(json_encode($clients));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Obter cliente por ID
    public function getClientById($request, $response, $args)
    {
        $id = $args['id'];
        $client = $this->clientModel->getClientById($id);

        if (!$client) {
            $response->getBody()->write(json_encode(['message' => 'Client not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($client));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Atualizar cliente
    public function updateClient($request, $response, $args)
    {
        $id = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        $name = $data['name'] ?? null;
        $dob = $data['dob'] ?? null;
        $cpf = $data['cpf'] ?? null;
        $rg = $data['rg'] ?? null;
        $phone = $data['phone'] ?? null;

        $client = $this->clientModel->getClientById($id);

        if (!$client) {
            $response->getBody()->write(json_encode(['message' => 'Client not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        try {
            // Atualizar o cliente
            $this->clientModel->updateClient($id, $name, $dob, $cpf, $rg, $phone);

            // Buscar os dados atualizados do cliente
            $updatedClient = $this->clientModel->getClientById($id);

            $response->getBody()->write(json_encode($updatedClient));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    // Excluir cliente
    public function deleteClient($request, $response, $args)
    {
        $id = $args['id'];
        $client = $this->clientModel->getClientById($id);

        if (!$client) {
            $response->getBody()->write(json_encode(['message' => 'Client not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $this->clientModel->deleteClient($id);

        $response->getBody()->write(json_encode(['message' => 'Client deleted successfully']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
