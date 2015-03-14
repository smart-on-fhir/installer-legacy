var http = require('http')
var createHandler = require('github-webhook-handler')
var child_process = require('child_process');

var path = process.env['WEBHOOK_PATH'] || '/webhook';
var port = process.env['PORT'] || 7777;
var secret = process.env['SECRET'] || 'changeme';

var handler = createHandler({ path: path, secret: secret})

var events = require('github-webhook-handler/events')
Object.keys(events).forEach(function (event) {
  console.log(event, '=', events[event])
})

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(port)

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  child_process.spawn("/bin/bash", ["update.sh"]);
})

console.log("Up and listening to port", port, "path", path);
