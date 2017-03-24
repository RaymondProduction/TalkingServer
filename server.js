var restify = require('restify');
var cmd = require('node-cmd');
var bodyParser = require('body-parser');

function getRespond(req, res, next) {
  cmd.run('echo "'+req.params.speech+'" | festival --tts --language russian');
  res.send('You say: ' + req.params.speech);
  console.log('You say: ' + req.params.speech);
  next();
}

function postRespond(req, res, next) {
  cmd.run('echo Это пост запрос. "'+
    req.body.speech+
    '" | festival --tts --language russian');

  res.send('You say: ' + req.body.speech);
  console.log(req.body);

  next();
}

var server = restify.createServer();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true,
}));

server.get('/speak/:speech', getRespond);
server.post('/speak', postRespond);

server.listen(8080, function() {
  console.log(server.name, server.url);
});
