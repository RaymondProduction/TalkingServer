Чтоб запустити скрипт голосового сповіщення команда.
Скріпт в папці home/raymond/TalkingServer/for_my_work

node monitor.js -a <ip хоста: порт сервера> -log <шлях до файлу логов>

Приклад:

node monitor.js -a 127.0.0.1:8080 -log /home/raymond/putty.log

Для того щоб був створений файл логов. Треба створити з*єднання
в putty з параметроми в розділі Loggin.

Log file name:
 бажано вибрати /home/<ім*я користувача>/putty.log
 наприклад: /home/raymond/putty.log

Пставим перемикач  /   в позицію
Sesssion logging: * All sessinon output

Пставим перемикач                        /   в позицію
What to do if the log file alrady exist: * Ask the user every time
Поставте прапорець * Flush log file frequently

Прибрати прапорець * Omit known password fields 

