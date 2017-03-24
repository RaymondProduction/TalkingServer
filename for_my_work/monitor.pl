#!/bin/perl
use strict;
use warnings;

use LWP::Simple;

my $filename=$ARGV[1];
my $ipANDport=$ARGV[0];

sub speak{
 my $contents;
 my $st = shift;
 $contents = get("http://".$ipANDport."/speak/".$st);
};

if (!$filename) {$filename='test.txt';};

my $i=0;
my $old=0;


$| = 1; # Disable output buffering


open SPEECH, 'sentence.txt';
my $sentence = <SPEECH>;
close SPEECH;

while (1) {
  $i=0;
  open FILE, $filename;
  while (defined (my $file_line = <FILE>)) {
        $i++;
        if ($i>$old && $old!=0) {print "\e[32m\n$file_line\n";}
  }
  close FILE;
  #print ".";
  if ($i!=$old) {
    $old=$i;
    speak($sentence);
    print "\n\e[31mdone";
    print "\e[0m\n";
  };
  sleep 1;
}

