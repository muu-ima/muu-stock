FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y libzip-dev zip unzip libpq-dev && \
    docker-php-ext-install pdo pdo_pgsql pgsql zip

# Composer をインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ソースコードをコピー
COPY . /var/www/html

# Composer install
RUN composer install --no-dev --optimize-autoloader

# ポート開放
EXPOSE 8000

# スタートスクリプトを用意
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
