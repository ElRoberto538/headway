FROM --platform=amd64 node:14-bullseye-slim

RUN apt-get update -y
RUN apt-get install -y git osmium-tool postgis python2
RUN apt-get install -y sudo

USER root
RUN bash -c 'sudo npm_config_user=root PYTHON=$(which python2) npm install -g @mapbox/pt2itp'
RUN mkdir -p /app
RUN chown -R postgres /app
USER postgres

COPY package.json /app/

WORKDIR /app

RUN yarn install

COPY *.js *.sh data.osm.pbf /app/

# Need root to start postgres.
USER root

ENTRYPOINT [ "/bin/bash" ]
