<?php

namespace App\Controllers;

use App\Models\ModelsUser;
use Firebase\JWT\JWT;

class UserController
{
    private $userModel;
    private $secretKey = 'your_secret_key';

    public function __construct()
    {
        $this->userModel = new ModelsUser();
    }

    public function register($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $status = $data['status'] ?? null;

        try {
            $createdUser = $this->userModel->createUser($name, $email, $password, $status);

            $response->getBody()->write(json_encode($createdUser));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    public function login($request, $response, $args)
    {
        $data = json_decode($request->getBody()->getContents(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (empty($email) || empty($password)) {
            $response->getBody()->write(json_encode(['message' => 'Email e senha são obrigatórios']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        $user = $this->userModel->getUserByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            $response->getBody()->write(json_encode(['message' => 'Credenciais inválidas']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        unset($user['password']);

        $issuedAt = time();
        $expirationTime = $issuedAt + 360000;
        $payload = [
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'sub' => $user['id'],
            'email' => $user['email'],
        ];

        $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

        $response->getBody()->write(json_encode([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'status' => $user['status'],
            ],
            'token' => $jwt,
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    public function getAllUsers($request, $response, $args)
    {
        $users = $this->userModel->getAllUsers();
        $userArray = [];

        while ($user = $users->fetch(\PDO::FETCH_ASSOC)) {
            unset($user['password']);
            $userArray[] = $user;
        }

        $response->getBody()->write(json_encode($userArray));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function getUserById($request, $response, $args)
    {
        $id = $args['id'];
        $user = $this->userModel->getUserById($id);

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'Usuário não encontrado']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        unset($user['password']);

        $user = array_filter($user, function ($key) {
            return !is_numeric($key);
        }, ARRAY_FILTER_USE_KEY);

        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function updateUser($request, $response, $args)
    {
        $id = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $status = isset($data['status']) ? (int)$data['status'] : null;

        if ($id == 1) {
            $response->getBody()->write(json_encode(['message' => 'Não é possível alterar o administrador']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        $user = $this->userModel->getUserById($id);

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'Usuário não encontrado']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $this->userModel->updateUser($id, $name, $email, $status);

        $updatedUser = $this->userModel->getUserById($id);

        unset($updatedUser['password']);

        $response->getBody()->write(json_encode($updatedUser));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function deleteUser($request, $response, $args)
    {
        $id = $args['id'];
        $user = $this->userModel->getUserById($id);

        if ($id == 1) {
            $response->getBody()->write(json_encode(['message' => 'Não é possível remover o administrador']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'Usuário não encontrado']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $this->userModel->deleteUser($id);

        $response->getBody()->write(json_encode(['message' => 'Usuário removido com sucesso']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
