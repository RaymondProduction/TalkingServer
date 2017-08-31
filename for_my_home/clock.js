
var a = parametr('-a') ? parametr('-a') : '127.0.0.1:8080';
var cron = require('node-cron');

var hoursSt = [
 'ноль часов',
 'час ночи',
 'два часа ночи',
 'три часа ночи',
 'четыре часа ночи',
 'пять часов утра',
 'шесть часов утра',
 'семь часов утра',
 'восемь часов утра',
 'девять часов утра',
 'десять часов',
 'одинадцать часов',
 'двенадцать часов',
 'час дня',
 'два часа дня',
 'три часа',
 'четыре часа дня',
 'пять часов',
 'шесть часов вечера',
 'семь часов вечера',
 'восемь часов вечера',
 'девять часов веера',
 'десять часов',
 'одинадцать часов',
]
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
  var hours = d.getHours();
  var minutes = d.getMinutes();
  if (d.getMinutes()==0) {
    st = 'Время '+hoursSt[hours]+' ровно';
  } else {
    st = 'Время '+hoursSt[hours]+', '+d.getMinutes()+' минут';
  };
  speakDistance(st);
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

//sayTime();
cron.schedule('*/30 * * * *', sayTime);
//917c8abb1fab87beafd774e86ea6121a
//http://api.openweathermap.org/data/2.5/find?q=Boryspil,ua&type=like&APPID=917c8abb1fab87beafd774e86ea6121a
