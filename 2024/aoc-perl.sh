perl -ape'($A[$.],$B[$.-1])=@F}{@A=sort@A;$\+=abs$_-shift@A for sort@B' input.txt
perl -ape'($A[$.],$B[$.])=@F}{for$a(@A){$\+=$a*grep{$a==$_}@B}' input.txt

perl -paXe'sub S{!grep{!(($_[0]<=>$_[1])*($_[-2]-pop@_)~~[1..3])}1..$#_}$\+=S@F}{' input.txt
perl -paXe'sub S{!!grep{@x=@_;splice@x,$_,1;!grep{!(($x[0]<=>$x[1])*($x[-2]-pop@x)~~[1..3])}1..$#x}0..$#_}$\+=S@F}{' input.txt

perl -p0e'$\+=eval y/,/*/rfor/mul\((\d+,\d+)\)/g}{' input.txt
perl -p0e's/don\x27t\(\).*?(do\(\)|$)//sg;$\+=eval y/,/*/rfor/mul\((\d+,\d+)\)/g}{' input.txt

perl -pe 'push@G,["",/./g]}{for$r(0..$.){for$c(0..$.){$_=join"",map{$G[$r][$c+$_]||0,$G[$r+$_][$c]||0,$G[$r+$_][$c+$_]||0,$G[$r+$_][$c-$_]||0}(0..3);$_=$n+=s/X(?=...M...A...S)|S(?=...A...M...X)//g}}' input.txt
perl -pe 'push@G,[/./g]}{for$r(0..$.){$\+=("$G[$r+1][$_+1]$G[$r][$_]$G[$r][$_+2]$G[$r+2][$_+2]$G[$r+2][$_]"=~/A(MMSS|MSSM|SMMS|SSMM)/)for(0..$.)}' input.txt

perl -00pe '(@R?@U:@R)=/\S+/g}{$\+=substr$_,y///c/2-1for grep{$u=" $_";!grep{($a,$b)=map{index$u,$_}/\d+/g;$a/$b>1}@R}@U' input.txt
perl -00pe '(@R?@U:@R)=/\S+/g}{for(@U){$_=$u=" $_,";for(sort@R){($a,$b)=map{index$u,$_}/\d+/g;substr$u,$b,0,substr$u,$a,3,""if$a/$b>1}$\+=substr$u,y///c/2-1if$u ne$_}' input.txt
