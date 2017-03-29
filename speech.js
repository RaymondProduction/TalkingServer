var Speech;
var cmd = require('node-cmd');

Speech = {
  speak: function(str) {
    var arr = (str + ' .').split(' ');
    var arrSpeech = new Array();
    var trigger = this.isKyr(arr[0]);
    var tmpSt = '';
    var self = this;
    arr.forEach(function(st, i) {
      if (trigger == self.isKyr(st) && i < arr.length - 1) {
        tmpSt += st + ' ';
      } else {
        arrSpeech.push({
          language: self.lang(trigger),
          string: tmpSt,
        });
        tmpSt = st;
        trigger = self.isKyr(st);
      };
    });
    this.speechSq(arrSpeech);
  },
  isKyr: function(str) {
    return /[а-я, 0-9]/i.test(str);
  },
  lang: function(a) {
    if (a) {
      return ' --language russian';
    } else {
      return '';
    };
  },
  speechSq: function(arrSpeech, i) {
    var self =this;
    if (!i) {
      i = 0
    };
    if (i < arrSpeech.length) {
      cmd.get('echo "' + arrSpeech[i].string + '" | festival --tts' + arrSpeech[i].language,
        function() {
          i = i + 1;
          self.speechSq(arrSpeech, i);
        });
    };
  }
}

module.exports = Speech;
// speak('1 3 5 two три hello тест');
