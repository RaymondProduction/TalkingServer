var page = require('webpage').create();
var fs = require('fs');
var t_old = fs.read('tickets.log');
var t_current;
page.open("http://91.219.252.234/cgi-bin/stat.pl", function(status) {
  if (status === "success") {
    // page.onConsoleMessage = function(msg, lineNum, sourceId) {
    //   console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    // };
    page.evaluate(function() {
      console.log('Log in');
      document.getElementById("_uu").value = "raymond";
      document.getElementById("_pp").value = "parol1987";
      document.getElementsByClassName("nav_button")[0].click();
      // page is redirecting.
    });
    setInterval(function() {
      var t_current = page.evaluate(function() {
        console.log('I read number tickets');
       //return document.getElementsByClassName("big warn2")[0].outerHTML;
       return document.getElementsByClassName("big warn2")[0].textContent;
      });
      //page.render("page.png");
      //var content = page.content;
      console.log('number of tickets: ' + t_current);
      if (t_current!=t_old) {
        fs.write('tickets.log', t_current, 'w');
        t_old = t_current;
      }
      //phantom.exit();
    }, 5000);
  }
});
