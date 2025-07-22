FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y git unzip libzip-dev zip && \
    docker-php-ext-install pdo_mysql zip

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html/backend

# アプリのソースをコピー
COPY . /var/www/html/backend

# Composerの依存インストール
RUN composer install --no-interaction --optimize-autoloader

# Laravelのキャッシュクリア
RUN php artisan config:clear

EXPOSE 9000
CMD ["php-fpm"]
