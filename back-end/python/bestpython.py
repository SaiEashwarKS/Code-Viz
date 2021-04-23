from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import json
import re
import ast

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
p1 = Popen(['python3','-m','pdb',my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#p1 = Popen(['gdb', 'a.out'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout, F_GETFL) # get current p.stdout flags
fcntl(p1.stdout, F_SETFL, flags | O_NONBLOCK)

global_vars={}
individual_id=1
local_vars={}
vartoptrmapper={}
values={}
sleep(0.2)

def process_output(cur_str,typegl):
    global individual_id
    cur_str=cur_str.replace("\n(Pdb)","")
    if "for help about object.}, " in cur_str:
        indexfound=cur_str.find("for help about object.}, ")+len("for help about object.}, ")
        cur_str=cur_str[indexfound:-1]
        cur_str="{"+cur_str.replace("'",'"')
        cur_str=cur_str.replace(": ",": '").replace(", ","',").replace('}',"'}")
        #print(cur_str)
        start=1
        end=len(cur_str)
        while(start<=end):
            k=cur_str.find("{",start)
            total=1
            if k!=-1:
                j=k+1
                while(total):
                    if cur_str[j]=='{':
                        total+=1
                    elif cur_str[j]=='}':
                        total-=1
                    j+=1
                cur_str=cur_str[:k+1]+cur_str[k+1:j].replace("'",'"')+cur_str[j:]
                start=j
            else:
                break
        z=ast.literal_eval(cur_str)
        all_variables=[]
        for i in list(z.keys()):
            if "<function" in z[i] or "<module" in z[i] or "return" in i:
                continue
            idele=None
            if typegl=="G":
                if i not in global_vars:
                    global_vars[i]=individual_id
                    individual_id+=1
                idele=global_vars[i]
            else:
                if i not in local_vars:
                    local_vars[i]=individual_id
                    individual_id+=1
                idele=local_vars[i]
            val=z[i]
            if z[i] not in values and z[i] not in vartoptrmapper:
                values[z[i]]=individual_id
                individual_id+=1
                vartoptrmapper[i]=values[z[i]]
            elif z[i] in vartoptrmapper:
                val=vartoptrmapper[z[i]]
                vartoptrmapper[i]=vartoptrmapper[z[i]]
            all_variables.append({"type":"var","id":values[z[i]],"name":"","val":val,"data_type":""})
            all_variables.append({"type":"ptr","id":idele,"name":i,"val":values[z[i]],"data_type":""})
            
            
        return all_variables
    
lnc=1
prevline=0
myout=""
while(True):
    try:
        myout+=read(p1.stdout.fileno(),1024).decode()
    except Exception as e:
        #print(e)
        break
print(myout)
lines_data=[]
while(True):
    p1.stdin.write("n\n".encode())#let it be n only: not step i.e. s
    p1.stdin.flush()
    sleep(0.2)
    myout=""
    while(True):
        try:
            myout+=read(p1.stdout.fileno(),1024).decode()
        except Exception as e:
            #print(e)
            break
    if "The program finished and will be restarted" in myout:
        break 
    print("HERE",myout)   
    parent_index=myout.find("(")
    endline=myout.find(")")
    #print(myout)
    prevline=lnc
    lnc=myout[parent_index+1:endline]#till here works, gives the line number
    #print(lnc)
    print(prevline,lnc)
    p1.stdin.write("globals()\n".encode())
    p1.stdin.flush()
    sleep(0.2)
    myout=""
    while(True):
        try:
            myout+=read(p1.stdout.fileno(),1024).decode()
        except Exception as e:
            #print(e)
            break
    
    p1.stdin.write("locals()\n".encode())
    p1.stdin.flush()
    sleep(0.2)
    myout1=""
    while(True):
        try:
            myout1+=read(p1.stdout.fileno(),1024).decode()
        except Exception as e:
            #print(e)
            break

    di=process_output(myout,"G")
    lines_data.append({"LineNum":prevline,"type":"GlobalVariables","Contents":di})
    if myout1!=myout:
        di2=process_output(myout1,"L")
        lines_data.append({"LineNum":prevline,"type":"StackFrame","Contents":di2})

f=open("final.json","w")
maindi={"Lines_Data":lines_data[:-1]}
f.write(json.dumps(maindi,indent=2))
f.close()
print("DONE")

"""
from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import json
import re

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
p1 = Popen(['python3','-m','pdb',my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#p1 = Popen(['gdb', 'a.out'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout, F_GETFL) # get current p.stdout flags
fcntl(p1.stdout, F_SETFL, flags | O_NONBLOCK)

'''
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
'''
lnc=1
myout=""
while(True):
    try:
        myout+=read(p1.stdout.fileno(),1024).decode()
    except Exception as e:
        #print(e)
        break

while(True):
    p1.stdin.write("n\n".encode())#let it be n only not step i.e. s
    p1.stdin.flush()
    sleep(0.2)
    while(True):
        try:
            myout+=read(p1.stdout.fileno(),1024).decode()
        except Exception as e:
            #print(e)
            break
    if "The program finished and will be restarted" in myout:
        break    
    parent_index=myout.find("(")
    endline=myout.find(")")
    lnc=myout[parent_index+1:endline]#till here works, gives the line number
    #print(myout)
    
    p1.stdin.write("dir()\n".encode())
    p1.stdin.flush()
    sleep(0.2)
    myout=""
    while(True):
        try:
            myout+=read(p1.stdout.fileno(),1024).decode()
        except Exception as e:
            #print(e)
            break
    
    all_elements=myout.split("\n")[0].strip("[]")
    all_elements=all_elements.split(",")
    for i in all_elements:
        k=i.strip().strip("'")
        if k in ["__builtins__","__file__","__name__","__return__"]:
            continue
        p1.stdin.write(f"pp {k}\n".encode())
        p1.stdin.flush()
        sleep(0.2)
        myout=""
        while(True):
            try:
                myout+=read(p1.stdout.fileno(),1024).decode()
            except Exception as e:
                #print(e)
                break
        if "<function" in myout or "<class" in myout or "<module" in myout:
            continue
        myout=myout.replace("\n(Pdb)","")
        print("SHEEK",k,myout)


print("DONE")
"""