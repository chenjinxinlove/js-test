#!/bin/bash
ftp -n<<!
open 140.143.244.18
user root
binary
hash
cd /home/chenjinxin/www/weather-hl/datanews/
lcd /Users/chenjinxin/chenjinxin/code/vue/music//build/
prompt
mput *
close
bye
!