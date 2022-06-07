import Geocoder from '@mapbox/carmen';
import Stream from 'stream';

const conf = {
  to: Geocoder.auto('./data.mbtiles'),
};
let carmen = new Geocoder(conf);

const outputStream = new Stream.Writable();
outputStream._write = (chunk, encoding, done) => {
    const doc = JSON.parse(chunk.toString());
    console.log(doc)
    done();
};

carmen.index(process.stdin, conf.to, {zoom: 6, output: outputStream}, ()=> {
  carmen.analyze(conf.to, (err, stats)=> {console.log(stats)})
});

