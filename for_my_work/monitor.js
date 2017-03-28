var fs = require('fs');

fs.watch('test.log', function(curr, prev) {
  // on file change we can read the new xml
  // console.log(`the current mtime is: ${curr.mtime}`);
  // console.log(`the previous mtime was: ${prev.mtime}`);
  fs.readFile('test.log', 'utf8', function(err, data) {
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
      console.log('=>', strings[strings.length - 2]);
      console.log('=>', strings[strings.length - 1]);
    }
  });
});

2017-03-28 21:14:32


