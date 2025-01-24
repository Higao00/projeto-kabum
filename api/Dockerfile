FROM php:8.2-fpm

# Instalar dependências do sistema e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    git \
    && docker-php-ext-install zip mysqli pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiar o Composer para o container
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Copiar os arquivos do projeto
COPY . /var/www/html

# Definir as permissões corretas
RUN chown -R www-data:www-data /var/www/html

# Expor a porta 9000 para o PHP-FPM
EXPOSE 9000

# Iniciar o PHP-FPM
CMD ["php-fpm"]
