#!/usr/bin/perl -p
push@s,[split""]}{for(@s){$c=0;for(@$_){if(/\d/){$n.=$_}else{if($n){@p=($c-1-length$n..$c);$\+=$n if join("",map{@{$s[$_]}[@p]}$r-1,$r,$r+1)=~/[^\d\s.]/}$n=""}$c++}$r++}