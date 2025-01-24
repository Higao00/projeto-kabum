<?php

require __DIR__ . '/../vendor/autoload.php';

// Carregar as rotas
$app = require __DIR__ . '/../routes/web.php';

$app->run();
