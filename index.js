
const express = require('express')
const app = express()
let givenPort;
let port = process.env.PORT || 3000;
app.set('trust proxy', true)

process.argv.forEach(function (val, index, array) {
  if(index === 2) {
    givenPort = Number(val);
    givenPort = (isNaN(givenPort) || (givenPort < 0 || givenPort > 65535)) ? port : Number(val); 
  } else {
    givenPort = port;
  }
});

app.get('/', function (req, res) {
  let  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  let html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>What IP build</title>
    </head>
    <body>
      <div>Hello, Your ip address is ${ip}</div>
    </body>
  </html>`
  res.status(200).send(html);
})
 
app.listen(givenPort)
console.log(`App listening on port ${givenPort}`);
