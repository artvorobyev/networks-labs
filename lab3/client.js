var net = require('net');
var fs = require('fs');
const { resolve } = require('path');
var express = require('express');
var app = express();
app.use(express.json());

var server = app.listen('8081', function () {
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});

app.get('/pugs/:pugId', function (req, res) {
  const pugId = req.params.pugId;
  var client = new net.Socket();
  client.connect(1337, '127.0.0.1', function () {
    console.log('Connected');
    client.write(`pug${pugId}.jpeg`);
  });

  const chunks = [];
  client.on('data', (chunk) => {
    chunks.push(chunk);
    console.log(`chunk ${chunks.length}, length: ${chunk.length}`);
  });
  client.on('end', () => {
    const file = Buffer.concat(chunks);
    fs.writeFileSync(`downloaded/${pugId}.jpeg`, file);
    res.status(200).sendFile(resolve(`./downloaded/${pugId}.jpeg`));
  });

  client.on('close', function () {
    console.log('Connection closed');
  });
});
