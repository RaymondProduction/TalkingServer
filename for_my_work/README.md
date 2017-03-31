Чтоб запустити скрипт голосового сповіщення команда.

Скріпт в папці home/raymond/TalkingServer/for_my_work
```
node monitor.js -a <ip хоста: порт сервера> -log <шлях до файлу логов>
```
**Приклад:**
```
node monitor.js -a 127.0.0.1:8080 -log /home/raymond/putty.log
```
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

Задопомогою ssh також можно робити файл логов
```
ssh <user>@<host> -p port | tee -a <log file>
```
**Приклад**
```
ssh raymond@127.0.0.1 -p 22 | tee -a /home/raymond/ssh.log
```
Також для автоматизації може знадобитись поставити ключ


Генеруємо клуч

```
$ssh-keygen -t rsa -b 2048
```
Далі просто натискаємо [Enter]
```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/username/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/username/.ssh/id_rsa.
Your public key has been saved in /home/username/.ssh/id_rsa.pub.
```
Скопіюй ключ до цільового сервера:
```
$ ssh-copy-id user@host
user@host password:
```
Спробуйте зайти
```
ssh <user>@<host> -p port
```

Для автоматизації перехоплення логів, можна скористатись командою tail.
Тоді побудуємо команду для входу на сервер по shh, запису сесссії на кліентську машину, та вичитування логів з файлу.
```
$echo "tail -f /var/log/test.log" | ssh -T <user>@<host> -p <port> | tee -a server.log
```
Якщо потрібно здійснити дану процедуру з правами root то такий ланцюг комманд
```
$echo "tail -f /var/log/test.log" | sudo -u <user client> ssh -T -p <port> <user server>@<host> | tee -a server.log
```
