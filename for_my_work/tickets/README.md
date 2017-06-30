# Tickets monitor system

## Install

```
$sudo apt-get install phantom
```

## Run system for monitoring
This script which write log file of the number of tickets
```
$phantomjs nodeny.js
```
Script which read log file and post request on talking server when log file is change
```
$node monitor_tickets.js -log tickets.log
```
