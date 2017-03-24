# Talking Server

##The simple server which can speak

This server must speak when on client computer change log file.
If log file change, a script written by a pearl makes a request to the server.

## Install

### Step 1 - Festival
The Festival Speech Synthesis System is a
general multi-lingual speech synthesis system
```
sudo apt install festival
sudo apt-get install festvox-ru
```
For test speech
```
echo "Привет мир" | festival --tts --language russian
```
### Step 2 - install for Perl script
```
perl -MCPAN -e 'install LWP::Simple'
```
### Step 3 - install modules for server.js
```
npm install
```
### Use

Now, you can run server.js
```
node server.js
```
It wait get request from Perl script.
```
perl client.pl <file.log>
```
