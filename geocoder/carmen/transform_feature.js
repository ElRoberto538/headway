import split from 'split';

let stream = process.stdin.pipe(split());

stream.on('data', (line) => {
  let feature = JSON.parse(line)

  if (feature['properties']['name']) {
    console.log(line)
  }
});
stream.on('end', () => {
  process.exit()
});
stream.on('error', (err) => {
  process.exit()
});

stream.resume()
