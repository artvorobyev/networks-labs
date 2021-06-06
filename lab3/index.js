var net = require('net');

const fs = require('fs');
const server = net.createServer((c) => {
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('data', (readData) => {
    const filename = readData.toString();
    fs.readFile(`files/${filename}`, (err, data) => {
      if (!err) {
        console.log(data.length);
        c.write(data);
        c.end();
      } else {
        console.log(`readfile ${filename} err`);
      }
    });
  });
});
server.on('error', (err) => {
  throw err;
});
server.listen(1337, '127.0.0.1', () => {
  console.log('server bound');
});
