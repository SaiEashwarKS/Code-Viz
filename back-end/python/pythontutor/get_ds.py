from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import json
import re
import ast
import sys

my_file = sys.argv[1]
p1 = Popen(['python3','-m','pdb',my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#p1 = Popen(['gdb', 'a.out'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout, F_GETFL) # get current p.stdout flags
fcntl(p1.stdout, F_SETFL, flags | O_NONBLOCK)
sleep(0.2)
lnc=1
prevline=0
myout=""
while(True):
    try:
        myout+=read(p1.stdout.fileno(),1024).decode()
    except Exception as e:
        #print(e)
        break
