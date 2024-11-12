FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    wget \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

RUN git config --global --add safe.directory /var/www/symfony

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony
COPY . ./

CMD ["php-fpm"]