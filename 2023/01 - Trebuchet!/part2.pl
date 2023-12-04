#!/usr/bin/perl -p
%y=map{$_,++$z,$z,$z}split/\|/,$x="one|two|three|four|five|six|seven|eight|nine|\\d"if!$x;$\+=$y{(/$x/g)[0]}.$y{(/^.*($x)/)[0]}}{