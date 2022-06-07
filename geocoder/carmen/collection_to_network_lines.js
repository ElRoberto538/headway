import split from 'split';
import normalize from '@mapbox/geojson-normalize';

let firstLine = true
let done = false
let id = 0

let stream = process.stdin.pipe(split());

stream.on('data', (line) => {
  if (line === ']') {
    done = true
  }
  if (!line) {
    return
  }
  if (firstLine || done) {
    firstLine = false
    return
  }
  try {
    let feature = JSON.parse(line.substring(0, line.length - 1))
    if (!feature['properties']['highway']) {
      return;
    }
    if (!feature['properties']['name']) {
      return;
    }
    let newProps = {
      street: feature['properties']['name'],
      id: id
    }
    id += 1
    let newFeature = {type: feature['type'], geometry: feature['geometry'], properties: newProps}
    console.log(JSON.stringify(newFeature))  
  } catch (e) {}
});
stream.on('end', () => {
});
stream.on('error', (err) => {
});

stream.resume()
