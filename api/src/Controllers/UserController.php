<?php

require_once '../models/User.php';

class UserController
{
    private $pdo;
    private $userModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->userModel = new User($this->pdo);
    }

    public function register($request, $response, $args)
    {
        $data = $request->getParsedBody();

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $status = $data['status'];

        if (empty($name) || empty($email) || empty($password) || empty($status)) {
            return $response->withJson(['error' => 'Missing required fields'], 400);
        }

        $this->userModel->createUser($name, $email, $password, $status);

        return $response->withJson(['message' => 'User created successfully'], 201);
    }

    public function login($request, $response, $args)
    {
        $data = $request->getParsedBody();
        $email = $data['email'];
        $password = $data['password'];

        $user = $this->userModel->getUserByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            return $response->withJson(['error' => 'Invalid credentials'], 401);
        }

        return $response->withJson(['message' => 'Login successful', 'user' => $user], 200);
    }
}
