var fs = require('fs');

var a = parametr('-a');
var log = parametr('-log');

if (!a) {
  a = '127.0.0.1:8080';
};

if (!log) {
  console.log('log file unknown');
} else {
  console.log('log file: ',log);
};


fs. (log, function(curr, prev) {
  // on file change we can read the new xml
  // console.log(`the current mtime is: ${curr.mtime}`);
  // console.log(`the previous mtime was: ${prev.mtime}`);
  console.log('change');
  fs.readFile(log, 'utf8', function(err, data) {
    if (err) throw err;
    var strings = data.split('\n'); // разделить на строки
    // удаляем строки пустые строки в конце
    while (strings[strings.length - 1] == '') {
      // если удаляем и повторяем до тех пор пока не будет непустая
      if (strings[strings.length - 1] == '') {
        strings.splice(strings.length - 1, 1);
      }
    }
    if (strings.length > 1) {
      parseAndGetForSpeech(strings[strings.length - 1]);
    }
  });
});

function parseAndGetForSpeech(st) {
  var arr = st.split(' ... ');
  if (arr) {
    var MAC = arr[3].split('-')[1].replace(' ', '');
    var login = arr[1];
    var flat = arr[2].split('-')[1].replace(' ', '');
    var UIDAbills = arr[0];

    if (MAC != '99:99:99:99:99:99') {
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
      var url = 'http://'+a+'/speak/' + encodeURI(st2);

      http.get(url, function(res) {
        res.setEncoding("utf8");
        res.on("data", function(data) {
          console.log(data);
        });
      });
    };
  }
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
