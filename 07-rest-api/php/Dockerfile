FROM php:8.1-apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN a2enmod rewrite
COPY rest.conf /etc/apache2/sites-enabled/000-default.conf
RUN apt-get update && apt-get upgrade -y