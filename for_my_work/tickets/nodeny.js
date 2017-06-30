var system = require('system');
var argv = system.args;
var page = require('webpage').create();
//var password = parametr('-p');
//var user = parametr('-u');
//var logfile = parametr('-l');
//var adress = parametr('-a');
var fs = require('fs');
var t_old = fs.read('tickets.log');
var t_current;
//console.log('Url:'+adress+' log file: '+logfile);
page.open("http://91.218.253.233/cgi-bin/stat.pl", function(status) {
  if (status === "success") {
    page.onConsoleMessage = function(msg, lineNum, sourceId) {
      //console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
      console.log(msg);
    };
    page.evaluate(function() {

      console.log('Log in');
      document.getElementById("_uu").value = "user";
      document.getElementById("_pp").value = "password";
      document.getElementsByClassName("nav_button")[0].click();
      // page is redirecting.
    });
    setInterval(function() {
      var t_current = page.evaluate(function() {
       //return document.getElementsByClassName("big warn2")[0].outerHTML;
       return document.getElementsByClassName("big warn2")[0].textContent;
      });
      //page.render("page.png");
      //var content = page.content;
      if (t_current!=t_old) {
        console.log('I read number tickets');
        console.log('number of tickets: ' + t_current);
        fs.write('tickets.log', t_current, 'w');
        t_old = t_current;
      }
      //phantom.exit();
    }, 60000);
  }
});

function parametr(par) {
  var res;
  argv.forEach(function(item, i, arr) {
      if (par == item) {
      res = argv[i + 1];
    }
  });
  return res;
}
