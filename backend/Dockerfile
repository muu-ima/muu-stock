# Dockerfile
FROM php:8.3-fpm

# 必要なパッケージと拡張をインストール
RUN apt-get update \
    && apt-get install -y \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        zip \
        unzip \
        default-mysql-client \
    && docker-php-ext-install pdo_mysql

# 作業ディレクトリ
WORKDIR /var/www/html
