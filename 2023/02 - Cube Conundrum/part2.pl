#!/usr/bin/perl -p
%C=map{reverse split}sort{$a-$b}/\d+ ./g;$\+=$C{r}*$C{g}*$C{b}}{