var cmd = require('node-cmd');
var speech = require('./speech.js');

function speak(str) {
  var arr = (str + ' .').split(' ');
  var arrSpeech = new Array();
  var trigger = isKyr(arr[0]);
  var tmpSt = '';
  arr.forEach(function(st, i) {
    console.log(st);
    if (trigger == isKyr(st) && i<arr.length-1) {
      tmpSt += st + ' ';
    } else {
      arrSpeech.push({
        language: lang(trigger),
        string: tmpSt,
      });
      tmpSt = st;
      trigger = isKyr(st);
    };
  });
  console.log(arrSpeech);
  speechSq(arrSpeech);
}

var isKyr = function(str) {
  return /[а-я, 0-9]/i.test(str);
}

var lang = function(a) {
    if (a) {
      return ' --language russian';
    } else {
      return '';
    };
  }
//speak('Тестирование двух языков Hello I am speech system. Ну как нормально?');
//speak('1 3 5 two три hello тест');
// Тестирование двух языков, Hello, I am speech system. Ну как нормально?

function speechSq(arrSpeech, i) {
  if (!i) {
    i = 0
  };
  if (i < arrSpeech.length) {
    console.log('echo "' + arrSpeech[i].string + '" | festival --tts' + arrSpeech[i].language);
    cmd.get('echo "' + arrSpeech[i].string + '" | festival --tts' + arrSpeech[i].language,
      function() {
        i = i + 1;
        speechSq(arrSpeech, i);
      });
  };
}

speech.speak('Hi');
