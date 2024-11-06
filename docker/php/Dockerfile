FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony
COPY . .
RUN composer install --no-interaction --optimize-autoloader
RUN chown -R www-data:www-data /var/www/symfony

CMD ["php-fpm"]