# docker/php/Dockerfile
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    wget \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -ms /bin/bash symfony

WORKDIR /var/www/symfony

COPY . .

RUN chown -R symfony:symfony /var/www/symfony

USER symfony
RUN composer install --no-interaction --optimize-autoloader

USER www-data
CMD ["php-fpm"]