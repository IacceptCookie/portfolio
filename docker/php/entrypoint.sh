#!/bin/bash
set -e

mkdir -p /var/www/symfony/public/img/article/uploads
chown -R www-data:www-data /var/www/symfony/public/img/article/uploads
chmod -R 775 /var/www/symfony/public/img/article/uploads

exec "$@"