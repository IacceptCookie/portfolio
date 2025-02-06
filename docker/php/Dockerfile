FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    wget \
    grep \
    libpq-dev \
    libicu-dev \
    libsodium-dev \
    openssl \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl pdo pdo_pgsql sodium

RUN git config --global --add safe.directory /var/www/symfony

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony
COPY . ./

CMD ["php-fpm"]