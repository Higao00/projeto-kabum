<?php

require __DIR__ . '../../vendor/autoload.php';

$app = require __DIR__ . '../../src/Routes/web.php';

$app->run();
