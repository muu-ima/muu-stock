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

# Composer install
RUN composer install --no-interaction --optimize-autoloader

# .env の用意（最初だけ必要）
RUN cp .env.example .env || true

# APPキー生成（既にあれば無視）
RUN php artisan key:generate || true

# キャッシュクリア
RUN php artisan config:clear

# ポート開放
EXPOSE 8000

# Laravel 開発サーバーで起動
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
