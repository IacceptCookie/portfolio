FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    wget \
    grep \
    libpq-dev \
    libicu-dev \
    libsodium-dev \
    libjpeg-dev \
    libpng-dev \
    libwebp-dev \
    libfreetype6-dev \
    openssl \
    && docker-php-ext-configure intl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install intl pdo pdo_pgsql sodium gd

RUN git config --global --add safe.directory /var/www/symfony

COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony
COPY . ./

CMD ["php-fpm"]