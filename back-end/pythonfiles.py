from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import json

my_file=input("Enter python3 file ")
p1 = Popen(['python3', '-m',"pdb",my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout, F_GETFL) # get current p.stdout flags
#print(flags)
fcntl(p1.stdout, F_SETFL, flags | O_NONBLOCK)
p1.stdin.write("dir()\n".encode())
s=""
sleep(0.2)#this time i checked some values from 0.5 to 0.1, 02 gave best results
while(True):
    try:
        s+=read(p1.stdout.fileno(),1024).decode()
        #print("s",s)
    except Exception as E:
        #print(E)
        break
print(s)