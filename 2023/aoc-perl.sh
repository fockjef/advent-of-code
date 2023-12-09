# source aoc-perl.sh
# usage example: day1a input.txt

day1a () { perl -pe '$\+=join"",(/\d/g)[0,-1]}{' "$*"; }
day1b () { perl -pe '%y=map{$_,++$z,$z,$z}split/[|]/,$x="one|two|three|four|five|six|seven|eight|nine|\\d"if!$x;$\+=$y{(/$x/g)[0]}.$y{(/^.*($x)/)[0]}}{' "$*"; }
day2a () { perl -pe '%C=map{reverse split}sort{$a-$b}/\d+ ./g;$\+=$.if$C{r}<13&&$C{g}<14&&$C{b}<15}{' "$*"; }
day2b () { perl -pe '%C=map{reverse split}sort{$a-$b}/\d+ ./g;$\+=$C{r}*$C{g}*$C{b}}{' "$*"; }
day3a () { perl -pe 'push@s,[split""]}{for(@s){$c=0;for(@$_){if(/\d/){$n.=$_}else{if($n){@p=($c-1-length$n..$c);$\+=$n if join("",map{@{$s[$_]}[@p]}$r-1,$r,$r+1)=~/[^\d\s.]/}$n=""}$c++}$r++}' "$*"; }
day3b () { perl -e '@c=map{[split""]}@l=<>;push@c,[];for(@l){while(/\G.*?(\d+)/g){for$r($i-1,$i,$i+1){for(pos()-1-length$1..pos){push@{$g{"$r:$_"}},$1 if$c[$r][$_]eq"*"}}}$i++}for(%g){$\+=$_->[0]*$_->[1]if@$_==2}print' "$*"; }
day4a () { perl -pe '$\+=1<<s/( \d+)(?= .+\1\s)//g-1}{' "$*"; }
day4b () { perl -pe '$m[$.+$_]+=1+$m[$.]for(1..s/( \d+)(?= .+\1\s)//g);$\+=$m[$.]+1}{' "$*"; }
day5a () { perl -0l61pe '@x=/\d+/g;$\*=1+(($_/=2)+($y=sqrt($_*$_-$x[++$i+$#x/2]-1))|0)-$_+$y|0for@x[0..$#x/2]}{' "$*"; }
day5b () { perl -0pe '($t,$d)=s/ //gr=~/\d+/g;$t/=2;$\=1+($t+($x=sqrt($t*$t-$d-1))|0)-$t+$x|0}{' "$*"; }
day6a () { head "$*"; }
day6b () { head "$*"; }
day7a () { perl -ape '$C{$_}++for split"",$F[0];%C=push@H,join"",(sort{$b-$a}values%C),$F[0]=~y/KAT/RUB/r,"!"x$F[1]}{$\+=++$i*y/!/!/for sort@H' "$*"; }
day7b () { perl -ape '$C{$_}++for split"",$F[0];$n=delete$C{J};@X=sort{$b-$a}values%C;$X[0]+=$n;%C=push@H,join"",@X,$F[0]=~y/JTAK/0HUT/r,"!"x$F[1]}{$\+=++$i*y/!/!/for sort@H' "$*"; }
day8a () { head "$*"; }
day8b () { head "$*"; }
day9a () { perl -ape 'sub v{(grep{$_!=0}@_)?$_[$#_]+v(map{$_[$_]-$_[$_-1]}1..$#_):0}$\+=v(@F)}{' "$*"; }
day9b () { perl -ape 'sub v{(grep{$_!=0}@_)?$_[0]-v(map{$_[$_]-$_[$_-1]}1..$#_):0}$\+=v(@F)}{' "$*"; }
