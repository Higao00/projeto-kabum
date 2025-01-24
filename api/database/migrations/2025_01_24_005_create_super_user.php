<?php

class CreateSuperUser
{
    public function up($db)
    {
        // Definir dados do superusuário
        $name = 'admin';
        $password = password_hash('123456', PASSWORD_DEFAULT); // Defina a senha e o hash
        $email = 'admin@gmail.com';
        $status = 1; // true, indicando que o usuário está ativo

        // Verificar se o superusuário já existe
        $checkUserSql = "SELECT * FROM users WHERE email = :email";
        $stmt = $db->prepare($checkUserSql);
        $stmt->execute(['email' => $email]);

        if ($stmt->rowCount() === 0) {
            // Inserir superusuário no banco de dados com status como true (1)
            $insertSql = "INSERT INTO users (name, password, email, status) VALUES (:name, :password, :email, :status)";
            $stmt = $db->prepare($insertSql);
            $stmt->execute([
                'name' => $name,
                'password' => $password,
                'email' => $email,
                'status' => $status
            ]);

            echo "Superusuário criado com sucesso!\n";
        } else {
            echo "Superusuário já existe, pulando...\n";
        }
    }

    public function down($db)
    {
        // Caso queira reverter essa migração
        $deleteSql = "DELETE FROM users WHERE email = 'admin@gmail.com'";
        $db->exec($deleteSql);

        echo "Superusuário removido.\n";
    }
}
