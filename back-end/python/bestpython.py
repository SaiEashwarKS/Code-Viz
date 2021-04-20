from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import string
import re
import sys
# from tabulate import tabulate
import copy
import string
import json

lines_data = []

structures = [] #set() #to store all structures used in the program
struct_details = {}

heap = dict()#set()
heap_i = 0

stack_depth = 1

mo = [] # [['$i/func_name', 'address'], ['$i/func_name', 'address'], ...]
mp = [] # [['name', 'value'], ['name', 'value'], ...]
ml = [] # [['name', 'address'], ['name', 'address'], ...]

lnc = 0 # global variable for storing current line no
prev_lineno = 0

#above are temporarily used lists during data processing
vall = []#stores variable address
vallv = []#stores variable value
hista = []#stores variable, value, address; for each iteration
histac = []
val = []
fname = []#function name
fadd = []#function address
#below are temporarily used lists and counters during data processing
sv = []
svc = []
ap = []
tsav = []
tsav2 = []
tsav11 = []
cc11 = 0
counter = 0
gn = 0
sn = 0 # no of local/stack variables
an = 0

addr_to_id = {}#addr_to_id is for mapping addressID to smaller id
id_counter = 1

sep = ['+','-','=','*','/',';','[','.']
global_name_list = []
stop = 0
ret = 0
inputv = 0
func = re.compile("\w+ \(((\w+\=\w+), )*(\w+\=\w+)?\)")

#my_file = raw_input('Enter Python Program Name : ')
#subprocess.call(["pdb","-c","-Dmalloc=mymalloc","-g",my_file])
#subprocess.call(["pdb",my_file])
my_file="pythontry.py"
p1 = Popen(['pdb',my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#p1 = Popen(['gdb', 'a.out'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout, F_GETFL) # get current p.stdout flags
fcntl(p1.stdout, F_SETFL, flags | O_NONBLOCK)


def get_line_number(pipe):
    p1.stdin.write("l\n".encode())
    p1.stdin.flush()
    s=""
    sleep(0.5)#this time i checked some values from 0.5 to 0.1, 02 gave best results
    while(True):
        try:
            s+=read(p1.stdout.fileno(),1024).decode()
            #print("s",s)
        except Exception as E:
            #print(E)
            break
    k=s.find("->")
    j=k-3
    while(s[j]!=" "):
        j-=1
    global prev_lineno
    global lnc
    prev_lineno=lnc
    try:
        lnc = int(s[j+1:k-2])
    except:
        lnc=s[j+1:k-2]
flag=10
while(flag):
    p1.stdin.write("n\ndir()\n".encode())
    p1.stdin.flush()
    sleep(0.1)
    myout=""
    while(True):
        try:
            myout+=read(p1.stdout.fileno(),1024).decode()
        except:
            break
    print(myout)
    flag-=1
