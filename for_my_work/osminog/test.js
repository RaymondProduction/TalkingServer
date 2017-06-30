var speech = require('./speech');

var st = '13846 ... sanya184  ...  flat - 33 ... MAC - 99:99:99:99:99:99 ...  Abills - OK ... Nodeny - OK'

function parseAndGetForSpeech(st) {
  var arr = st.split(' ... ');
  var MAC = arr[3].split('-')[1].replace(' ', '');
  var login = arr[1];
  var flat = arr[2].split('-')[1].replace(' ', '');
  var UIDAbills = arr[0];

  if (MAC == '99:99:99:99:99:99') {
    var st2 = [
      'Пытается авторизироватся клиент с лоогиином',
      login,
      'жиивёт в квартире с номером',
      flat,
      'Номер клиента в абббилсе',
      UIDAbills,
      'Проганите ввланчиик, выставьте группу лентяиии.'
    ].join(' ');

    // GET запрос на сервер
    var http = require('http');
    var url = 'http://127.0.0.1:8080/speak/' + encodeURI(st2);

    http.get(url, function(res) {
      res.setEncoding("utf8");
      res.on("data", function(data) {
        console.log(data);
      });
    });
  };
}

parseAndGetForSpeech(st);
