#!/bin/bash

set -xe

echo 'local all postgres peer' > /etc/postgresql/13/main/pg_hba.conf
echo 'host all postgres 0.0.0.0/0 trust' >> /etc/postgresql/13/main/pg_hba.conf

service postgresql start

while !</dev/tcp/127.0.0.1/5432; do sleep 1; done;

sudo -u postgres psql --command='DROP DATABASE osm;' || echo "database does not exist"
sudo -u postgres psql --command='CREATE DATABASE osm;'
sudo -u postgres psql -d osm --command='CREATE EXTENSION postgis;' || echo "postgis already initialized"
sudo -u postgres psql -d osm --command='CREATE EXTENSION hstore;' || echo "hstore already initialized"

sudo -u postgres /app/build_index.sh
