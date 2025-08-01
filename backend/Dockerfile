FROM php:8.2-fpm

# 必要な拡張モジュールのインストール
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip unzip \
    && docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www/html

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-dev --optimize-autoloader

EXPOSE 9000

CMD ["php-fpm"]
