#!/bin/perl
use LWP::Simple;
my $req=$ARGV[0];
my $contents;
$contents = get($req);
print"\n$contents\n";

