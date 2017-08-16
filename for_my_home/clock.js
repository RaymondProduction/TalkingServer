
var a = parametr('-a') ? parametr('-a') : '127.0.0.1:8080';
var cron = require('node-cron');

function speakDistance(st) {
      // GET запрос на сервер
      var http = require('http');
      var url = 'http://'+a+'/speak/' + encodeURI(st);

      http.get(url, function(res) {
        res.setEncoding("utf8");
        res.on("data", function(data) {
          //console.log(data);
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

function sayTime(){
  var d = new Date();
  speakDistance('Время '+d.getHours()+' часов, '+d.getMinutes()+' минут');
}

function weather(){
        // GET запрос на сервер погоды
      var http = require('http');
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=Boryspil,ua&appid=917c8abb1fab87beafd774e86ea6121a&units=metric';

      http.get(url, function(res) {
        res.setEncoding("utf8");
        res.on("data", function(data) {
         w = JSON.parse(data);
         speakDistance('Погода. Температура '+w.main.temp+' градусов. Влажность '+w.main.humidity);
        console.log(JSON.parse(data).main.temp);
      });
  });
}

//weather();

cron.schedule('*/30 * * * *', sayTime);
//917c8abb1fab87beafd774e86ea6121a
//http://api.openweathermap.org/data/2.5/find?q=Boryspil,ua&type=like&APPID=917c8abb1fab87beafd774e86ea6121a
