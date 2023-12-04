#!/usr/bin/perl -p
%C=map{reverse split}sort{$a-$b}/\d+ ./g;$\+=$.if$C{r}<13&&$C{g}<14&&$C{b}<15}{