<?php

namespace App\Controllers;

use App\Models\ModelsAddress;

class AddressController
{
    private $addressModel;

    public function __construct()
    {
        $this->addressModel = new ModelsAddress();
    }

    // Criar endereço
    public function createAddress($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $client_id = $data['client_id'] ?? null;
        $postal_code = $data['postal_code'] ?? null;
        $street = $data['street'] ?? null;
        $neighborhood = $data['neighborhood'] ?? null;
        $locality = $data['locality'] ?? null;
        $city = $data['city'] ?? null;
        $state = $data['state'] ?? null;

        try {
            if (empty($client_id) || empty($postal_code) || empty($street) || empty($neighborhood) || empty($locality) || empty($city) || empty($state)) {
                throw new \Exception('Missing required fields');
            }

            // Criar o endereço
            $createdAddress = $this->addressModel->createAddress($client_id, $postal_code, $street, $neighborhood, $locality, $city, $state);

            $response->getBody()->write(json_encode([
                'message' => 'Address created successfully',
                'address' => $createdAddress
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    public function getAllAddresses($request, $response, $args)
    {
        $addresses = $this->addressModel->getAllAddresses();

        // Verificar se existem endereços
        if (!$addresses) {
            $response->getBody()->write(json_encode(['error' => 'No addresses found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        // Retorna todos os endereços
        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Obter endereços por ID do cliente
    public function getAddressesByClientId($request, $response, $args)
    {
        $clientId = $args['id'];
        $addresses = $this->addressModel->getAddressesByClientId($clientId);

        if (!$addresses) {
            $response->getBody()->write(json_encode(['error' => 'No addresses found for this client']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function getAddressById($request, $response, $args)
    {
        $clientId = $args['id'];
        $addresses = $this->addressModel->getAddressById($clientId);

        if (!$addresses) {
            $response->getBody()->write(json_encode(['error' => 'No addresses found for this id']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    // Atualizar endereço
    public function updateAddress($request, $response, $args)
    {
        $id = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        $postal_code = $data['postal_code'] ?? null;
        $street = $data['street'] ?? null;
        $neighborhood = $data['neighborhood'] ?? null;
        $locality = $data['locality'] ?? null;
        $city = $data['city'] ?? null;
        $state = $data['state'] ?? null;

        try {
            if (empty($postal_code) || empty($street) || empty($neighborhood) || empty($locality) || empty($city) || empty($state)) {
                throw new \Exception('Missing required fields');
            }

            // Atualizar o endereço
            $this->addressModel->updateAddress($id, $postal_code, $street, $neighborhood, $locality, $city, $state);

            // Obter os dados atualizados do endereço
            $updatedAddress = $this->addressModel->getAddressById($id);

            $response->getBody()->write(json_encode([
                'message' => 'Address updated successfully',
                'address' => $updatedAddress,
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    // Excluir endereço
    public function deleteAddress($request, $response, $args)
    {
        $id = $args['id'];
        $address = $this->addressModel->getAddressById($id);

        if (!$address) {
            $response->getBody()->write(json_encode(['error' => 'Address not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $this->addressModel->deleteAddress($id);

        $response->getBody()->write(json_encode(['message' => 'Address deleted successfully']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
