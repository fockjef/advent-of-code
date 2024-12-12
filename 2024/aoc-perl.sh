# Day 1
perl -ape'($A[$.],$B[$.-1])=@F}{@A=sort@A;$\+=abs$_-shift@A for sort@B' input.txt
perl -ape'($A[$.],$B[$.])=@F}{for$a(@A){$\+=$a*grep{$a==$_}@B}' input.txt

# Day 2
perl -paXe'sub S{!grep{!(($_[0]<=>$_[1])*($_[-2]-pop@_)~~[1..3])}1..$#_}$\+=S@F}{' input.txt
perl -paXe'sub S{!!grep{@x=@_;splice@x,$_,1;!grep{!(($x[0]<=>$x[1])*($x[-2]-pop@x)~~[1..3])}1..$#x}0..$#_}$\+=S@F}{' input.txt

# Day 3
perl -p0e'$\+=eval y/,/*/rfor/mul\((\d+,\d+)\)/g}{' input.txt
perl -p0e's/don\x27t\(\).*?(do\(\)|$)//sg;$\+=eval y/,/*/rfor/mul\((\d+,\d+)\)/g}{' input.txt

# Day 4
perl -pe 'push@G,["",/./g]}{for$r(0..$.){for$c(0..$.){$_=join"",map{$G[$r][$c+$_]||0,$G[$r+$_][$c]||0,$G[$r+$_][$c+$_]||0,$G[$r+$_][$c-$_]||0}(0..3);$_=$n+=s/X(?=...M...A...S)|S(?=...A...M...X)//g}}' input.txt
perl -pe 'push@G,[/./g]}{for$r(0..$.){$\+=("$G[$r+1][$_+1]$G[$r][$_]$G[$r][$_+2]$G[$r+2][$_+2]$G[$r+2][$_]"=~/A(MMSS|MSSM|SMMS|SSMM)/)for(0..$.)}' input.txt

# Day 5
perl -00pe '(@R?@U:@R)=/\S+/g}{$\+=substr$_,y///c/2-1for grep{$u=" $_";!grep{($a,$b)=map{index$u,$_}/\d+/g;$a/$b>1}@R}@U' input.txt
perl -00pe '(@R?@U:@R)=/\S+/g}{for(@U){$_=$u=" $_,";for(sort@R){($a,$b)=map{index$u,$_}/\d+/g;substr$u,$b,0,substr$u,$a,3,""if$a/$b>1}$\+=substr$u,y///c/2-1if$u ne$_}' input.txt

# Day 6
perl -e 'print "grid problems are dumb"' input.txt
perl -e 'print "grid problems are dumb"' input.txt

# Day 7
perl -pe 'push@X,[/\d+/g]}{sub C{my($g,$a,$u,@v)=@_;$a>$g?0:$u?C($g,$a*$u,@v)||C($g,$a+$u,@v):$a==$g}$\+=@$_[0]*C@$_ for@X' input.txt
perl -pe 'push@X,[/\d+/g]}{sub C{my($g,$a,$u,@v)=@_;$a>$g?0:$u?C($g,$a*$u,@v)||C($g,$a+$u,@v)||C($g,$a.$u,@v):$a==$g}$\+=@$_[0]*C@$_ for@X' input.txt

# Day 8
perl -pe '$i=1;push@{$X{$_}},[$.,$i++]for/./g}{$X{"."}=();for(values%X){while(($a,$b)=@{pop@$_}){for(@$_){($c,$d)=@$_;$e=2*$a-$c;$f=2*$b-$d;$g=2*$c-$a;$Y{"$e,$f"}=$Y{"$g,$h"}=$h=2*$d-$b}}}$_=grep{!grep{$_<1||$.<$_}split/,/}keys%Y' input.txt
perl -pe '$i=1;push@{$X{$_}},[$.,$i++]for/./g}{$X{"."}=();for(values%X){while(($a,$b)=@{pop@$_}){for(@$_){for$k(1..$.){($c,$d)=@$_;$e=$a-$k*($a-$c);$f=$b-$k*($b-$d);$g=$c-$k*($c-$a);$Y{"$e,$f"}=$Y{"$g,$h"}=$h=$d-$k*($d-$b)}}}}$_=grep{!grep{$_<1||$.<$_}split/,/}keys%Y' input.txt

# Day 9
perl -pe '@X=/./g;while(($s,$e)=splice@X,0,2){$\+=$i++*$s*($p+$s/2-.5);$p+=$s;while($e){$s=$e<$X[-1]?$e:$X[-1];$\+=($i+(@X>>1))*$s*($p+$s/2-.5);$p+=$s;$e-=$s;$#X-=2if!($X[-1]-=$s)}}}{' input.txt
perl -e 'nope'

# Day 10
perl -pe 'sub c{my($x,$n,$k)=@_;!$x--||$C{$k="$n:$x"}||($C{$k}=!$n?c($x,1):($_=length$n)%2?c($x,2024*$n):c($x,substr$n,0,$_/2,"")+c($x,0+$n))}$\+=c(25,$_)for/\d+/g}{' input.txt
perl -pe 'sub c{my($x,$n,$k)=@_;!$x--||$C{$k="$n:$x"}||($C{$k}=!$n?c($x,1):($_=length$n)%2?c($x,2024*$n):c($x,substr$n,0,$_/2,"")+c($x,0+$n))}$\+=c(75,$_)for/\d+/g}{' input.txt