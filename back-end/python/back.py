from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import json

my_file=input("Enter python3 file ")
p1 = Popen(['python3', '-m',"pdb",my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout.fileno(), F_GETFL) # get current p.stdout flags
#print(flags)
fcntl(p1.stdout.fileno(), F_SETFL, flags | O_NONBLOCK)
flags = fcntl(p1.stderr.fileno(), F_GETFL) # get current p.stdout flags
fcntl(p1.stderr.fileno(), F_SETFL, flags | O_NONBLOCK)
s=""
sleep(0.5)#this time i checked some values from 0.5 to 0.1, 02 gave best results
while(True):
    try:
        s+=read(p1.stdout.fileno(),1024).decode()
        #print("s",s)
    except Exception as E:
        #print(E)
        break
print(s)

p1.stdout.flush()

#p1.stdin.write("n\n".encode())
p1.stdin.flush()
p1.stdin.write("dir()\n".encode())
p1.stdin.flush()
#res = p1.communicate(b'n\n')[0]
#print(res.decode())
#res = p1.communicate(b'dir()\n')[0]
s=""
sleep(0.5)#this time i checked some values from 0.5 to 0.1, 02 gave best results
while(True):
    try:
        s+=read(p1.stdout.fileno(),1024).decode()
        #print("s",s)
    except Exception as E:
        #print(E)
        break
print(s)

#print(res.decode())
