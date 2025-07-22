FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    docker-php-ext-install pdo pdo_mysql && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリ
WORKDIR /var/www/html

# アプリのソースをコピー
COPY . /var/www/html

# nginx設定（必要に応じて調整）
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# supervisor設定
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ポート開放
EXPOSE 80

# supervisorでnginx + php-fpmを起動
CMD ["/usr/bin/supervisord"]
