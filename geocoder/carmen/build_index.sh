#!/bin/bash

set -xe

mkfifo /app/addresses.json
mkfifo /app/streets.json

touch /app/addresses_interpolated.json

pt2itp map --in-address=/app/addresses.json --in-network=/app/streets.json --output=/app/addresses_interpolated.json --db=osm &

osmium export --output-format geojson /app/data.osm.pbf | node collection_to_network_lines.js > /app/streets.json &
osmium export --output-format geojson /app/data.osm.pbf | node collection_to_addr_lines.js > /app/addresses.json &

wait $(jobs -p)
