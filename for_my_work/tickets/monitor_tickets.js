var fs = require('fs');
var http = require('http');

var a = parametr('-a');
var log = parametr('-log');

if (!a) {
  a = '127.0.0.1:8080';
};

if (!log) {
  console.log('log file unknown');
} else {
  console.log('log file: ', log);
};


fs.watchFile(log, function(curr, prev) {
  // on file change we can read the new xml
  // console.log(`the current mtime is: ${curr.mtime}`);
  // console.log(`the previous mtime was: ${prev.mtime}`);
  console.log('change');
  fs.readFile(log, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('number of tickets: ', data);
    getForSpeech('Пришел новый тикет');

  });
});

function getForSpeech(st) {
  // GET запрос на сервер
  var url = 'http://' + a + '/speak/' + encodeURI(st);

  http.get(url, function(res) {
    res.setEncoding("utf8");
    res.on("data", function(data) {
      console.log(data);
    });
  });
};

function parametr(par) {
  var res;
  process.argv.forEach(function(item, i, arr) {
    if (par == item) {
      res = process.argv[i + 1];
    }
  });
  return res;
}
