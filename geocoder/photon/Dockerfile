FROM debian:bullseye-slim

ENV TZ="America/New_York"

RUN apt-get update \
  && apt-get install -y --no-install-recommends postgresql postgis postgresql-postgis curl openjdk-11-jre-headless sudo

RUN mkdir /photon

WORKDIR /photon

RUN useradd -ms /bin/bash photon

RUN chown photon /photon

ARG PHOTON_VERSION=0.3.5
ARG PHOTON_HASH=6f438e905b020a70ec54de47b7c7f8b9c7921ef0ee84a3a9e0a6a6ebb7f74fa8

RUN curl -L -o ./photon.jar https://github.com/komoot/photon/releases/download/${PHOTON_VERSION}/photon-${PHOTON_VERSION}.jar

RUN echo "${PHOTON_HASH}  ./photon.jar" | sha256sum --check

COPY untar_and_start.sh /photon

CMD [ "/photon/untar_and_start.sh" ]
