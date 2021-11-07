from subprocess import *
import subprocess
from time import sleep
from fcntl import fcntl, F_GETFL, F_SETFL
from os import O_NONBLOCK, read
import string
import re
import sys
from tabulate import tabulate
import copy
import string
import json
import timeit
from os import remove
import argparse

lines_data = []

structures = [] #set() #to store all structures used in the program
struct_details = {}

heap = dict()#set()
heap_i = 0

stack_depth = 1

skip_fn = ["malloc", "free"]
use_next = 0

time_to_sleep = 0.1

mo = [] # [['$i/func_name', 'address'], ['$i/func_name', 'address'], ...]
mp = [] # [['name', 'value'], ['name', 'value'], ...]
ml = [] # [['name', 'address'], ['name', 'address'], ...]

lnc = 0 # global variable for storing current line no
prev_lineno = 0

pattern = r"\n[A-Za-z_][\S]*"

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

print("HELLO")

print_stmts = [""]

addr_to_id = {}#addr_to_id is for mapping addressID to smaller id
id_counter = 1

sep = ['+','-','=','*','/',';','[','.']
global_name_list = []
stop = 0
ret = 0
scanf = 0

func = re.compile("\w+ \(((\w+\=\w+), )*(\w+\=\w+)?\)")

parser = argparse.ArgumentParser()
parser.add_argument("-f","--file",type=str,required=True)
parser.add_argument("-s","--save",type=str,required=True)
parser.add_argument("-t","--time",type=int,required=False)

parser.add_argument('functions', type=str, nargs='*')
args = parser.parse_args()

my_file = args.file

final_json_location = args.save

final_file = final_json_location+".json"

time_limit = 200
if args.time:
	time_limit = min(args.time, 1000)
print(args.functions)
if args.functions:
	skip_fn += args.functions[0].split()

print(skip_fn)
# my_file = raw_input('Enter C Program Name (with ./ if in local directory): ')
'''
my_file = sys.argv[1]

if len(sys.argv)>2:
	skip_fn += sys.argv[2:]
#log variables
'''
logb = 1


subprocess.call(["gcc","-c","-Dmalloc=mymalloc", "-Dfree=myfree","-g",my_file])
logb = subprocess.call(["gcc","-g","-static",str(my_file)[:-1]+"o","C/mymalloc.o"])

if logb:
	p_glob = Popen(["gcc","-c",my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	op = p_glob.communicate()
	f = open(final_file,"w")
	#print("HERE",op[1])
	f.write(json.dumps("COMPILE TIME ERROR\n" + op[1]))
	f.close()
	#had to do all this bullshitery to remove left and right quotes which appear as unknown unicode characters in the file
	f = open(final_file,"r")
	new = (f.read().replace(my_file,"").replace("\u2018","'").replace("\u2019","'"))
	f.close()
	f = open(final_file,"w")
	f.write(new)
	f.close()
	sys.exit()

p_glob = Popen(['gdb', 'a.out'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
p_glob.stdin.write('info variables\n') # info variables -> to get all global variables
op = p_glob.communicate() # .communicate returns (stdout_data, stderr_data)
glob_list = op[0].split('\n')

try:
	i = glob_list.index('File '+my_file+':') + 1
	#print glob_list
	while glob_list[i]!='':
		x = glob_list[i].split(' ')[1].replace(";",'').replace("\n",'')
		if x[0] == '*':
			x = x[1:]
		name = ''
		for j in range(0,len(x)):
			if x[j] in sep:
				break
			name = name + x[j]
		global_name_list.append(name)
		i += 1
except:
	global_name_list = []
	pass

gn=len(global_name_list)# no of global variables
p1 = Popen(['gdb', 'a.out'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
flags = fcntl(p1.stdout, F_GETFL) # get current p.stdout flags
fcntl(p1.stdout, F_SETFL, flags | O_NONBLOCK)

print 'Hit Enter to Begin'

def tr():#function name
	'''
	returns ['function_name', 'address']
	'''
	p1.stdin.write('bt\n')
	my_out1 = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out1 = read(p1.stdout.fileno(), 1024)
		except OSError:
			break
	''' my_out1-> 
	#0  foo (a=1, p=0x7fffffffddfc, d=0x7fffffffddf8) at ./b.c:13
	#1  0x0000000000400ca1 in main () at ./b.c:33
	(gdb)
	'''
	my_out1 = string.replace(my_out1,'(gdb)','').strip()

	global stack_depth
	stack_depth = len(my_out1.split("\n"))
	
	my_out2 = my_out1.split(" ")
	s = "p &"+my_out2[2]+"\n" # my_out2[2]-> function_name-> foo
	p1.stdin.write(s)
	my_out = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out = read(p1.stdout.fileno(), 1024) # $11 = (int (*)(int, int *, int *)) 0x400bb6 <foo>\n(gdb)
		except OSError:
			break
	my_out = string.replace(my_out,'(gdb)','').strip() # $11 = (int (*)(int, int *, int *)) 0x400bb6 <foo>
	my_out = my_out.split("\n") # [$11 = (int (*)(int, int *, int *)) 0x400bb6 <foo>]
	my_out = [ x.split('=',1) for x in my_out ] # [['$11 ', ' (int (*)(int, int *, int *)) 0x400bb6 <foo>']]
	'''
	my_out = "\n"+my_out
	iters = re.finditer(pattern,my_out)
	iters = list(iters)
	newout = []
	for index in range(len(iters)-1):
		newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
	if iters:
		newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
	my_out = [ x.split('=',1) for x in newout ]
	'''

	for x in range(len(my_out)):
		my_out[x] = [ y.strip() for y in my_out[x] ] # [['$11', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
	my_out = filter(lambda a : len(a) == 2,my_out) # [['$11', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
	mo = copy.deepcopy(my_out)	# [['$11', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
	if len(my_out2)>2:
		if len(mo)>0:
			if len(mo[0])>0:
				mo[0][0]=my_out2[2]	# [['foo', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
	if len(my_out2)>1:
		#f.write(str(mo)+'\n')
		return mo # [['foo', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]

def pdisp(rv):#for further display
	'''
	rv contains [gl,sl,al,ln,fn,tdisp,tsdispv]

	gl: global variables list
	sl: local variables list
	al: argument variables list
	Above lists contain [Variable, Value, Address]

	ln: Line Number (Eg: Line 5)
	fn: Function Name/Address
	tsdispv: pointer display; filtered data

	tdisp: List containing each iteration pointer link structured data
	Display Format should be modified from tdisp
	tdisp contains only pointer data if existing; else there would be an empty list or no correspondence
	'''
	#print rv


def get_deref_value(addr, datatype,visited=set()):
	p1.stdin.write('p *('+datatype+') '+addr+'\n')
	my_out = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out = read(p1.stdout.fileno(), 1024)
		except OSError:
			break
	my_out = string.replace(my_out,'(gdb)','').strip()

	visited.add(addr)

	if 'struct' in datatype:
		fields = struct_fields_info(p1, datatype)
		val = my_out[my_out.find('{'):]
		pat = re.compile(r' <.*?>')
		val = re.sub(pat, '', val)
		reg = re.compile(r'0x[0-9a-f]*[,}]') #pattern to find hexadecimals in val, => they are pointers and we need to replace it with ID
		l = reg.findall(val)
		l = [x[0:-1] for x in l]
		for addr in l:
			ID = int(addr,16)
			if ID in addr_to_id:
				ID = addr_to_id[ID]
				#f.write("\n=====\naddr:"+addr+"\nID:"+str(ID)+"\nval:"+val+"\n=====\n\n")
			
			#elif addr in heap:
			#	ID = 'HEAPVAR -'+addr
				if addr in heap:
				#	#val = 'HEAPVAR -'+addr
				#	deref_val = get_deref_value(addr, datatype)
				#	heap[addr]['val'] = deref_val
					heap[addr]['id'] = ID


			elif ID == 0:	# hexadecimal 0x0 i.e 0 corresponds to NULL
				ID = 'N'
			else:
				ID = 'U'#addr
			val = val.replace(addr, str(ID))
		#sepdi['val'] = val #val is string -> 'data = 123, next = U'
		
		# string processing to make val a list of dictionary(key is variable name value is value)
		s = val#sepdi["val"]
		s = s.strip("{}")
		v = ["{"+x.replace("=",":")+"}" for x in s.split(",")]
		x = []
		#f.write(str(s)+"\n")
		
		print("VISITED",visited,addr)
		for i in v:
			k=i.strip("{}")
			k=k.split(":")
			print("HERE",k)
			try:
				x.append({k[0].strip():k[1].strip()})
			except:
				pass
		
		k = 0
		for i in range(len(fields)):
			if fields[i]['type'] == 'ptr':
				address = l[k]
				if address in heap and address not in visited:
					#deref_val = get_deref_value(address, fields[i]['data_type']) 
					#heap[address]['val'] = deref_val
					dt = fields[i]['data_type']
					heap[address]['val'] = get_deref_value(address, dt,visited)
					heap[address]['data_type'] = dt[: dt.rfind('*')].strip()
					if '*' in heap[address]['data_type']:
						heap[address]['type'] = "ptr"
					else:
						heap[address]['type'] = "var"
				k += 1
		#print("\nHEREE\n", fields)
		#print("\nVALUE\n",x)
		
		#return x
		
		new_x = []
		print("FIELDS",fields,"x",x)
		for i in range(len(fields)):
			new_d = fields[i].copy()
			new_d['val'] = x[i][fields[i]['name']]
			new_x.append(new_d)
		#print("\nNEW\n", new_x)
		#sys.exit(0)
		return new_x
		#return x
	else:
		val = my_out[my_out.find('=')+2:]
		
		return val
		
def maketogether(ln,di,gl,stringnamed):
	di["LineNum"]=ln
	di["type"]=stringnamed
	di['Contents']=[]
	global id_counter
	global addr_to_id
	for i in gl:
		is_struct = False
		sepdi={}
		datatype=i[2][1:i[2].rfind('*')]
		
		if 'struct' in datatype:
			is_struct = True
			if datatype[:datatype.find('*')] not in structures:
				structures.append(datatype[:datatype.find('*')])#structures.add(datatype)
		
		if stringnamed=="GlobalVariables":
			ID=int(i[2][i[2].rfind(")")+2:-4],16)#hexadecimal to int conversion
		else:
			try:
				ID=int(i[2][i[2].rfind(")")+2:],16)
			except:
				ID=int(i[2][i[2].rfind(")")+2:-4],16)
				#f.write(str(i)+"\n")
				#f.close()	
		#print(i,ID)
		if ID not in addr_to_id:
			addr_to_id[ID]=id_counter
			id_counter+=1
		ID=addr_to_id[ID]
		var=""
		val=""
		if '*' in datatype and datatype != 'void *':
			var="ptr"
			#try:
			addr = i[1].split()[0]
			pat = re.compile(r'\s*<.*?>')
			addr = re.sub(pat, '', addr)
			val = int(addr, 16)
			if val in addr_to_id:
				val = addr_to_id[val]
			#elif addr in heap:
				if addr in heap:
					#val = 'HEAPVAR -'+addr
					deref_val = get_deref_value(addr, datatype,set())
					#f.write("\ndatatype: "+datatype+" deref: "+str(deref_val)+"\n")
					heap[addr]['val'] = deref_val
					heap[addr]['data_type'] = datatype[: datatype.rfind('*')].strip()
					heap[addr]['id'] = val
					
					if '*' in heap[addr]['data_type']:
						heap[addr]['type'] = "ptr"
					else:
						heap[addr]['type'] = "var"
					
					#sepdi['is_heap'] = True
					#sepdi['deref_val'] = deref_val ### remove this #### in get deref func need to find data_type for further deref
			
			elif val == 0:
				val = 'N'
			
			else:
				#f.write("\nHEREE"+str(val)+"\n") ##
				val = 'U'
			#except:
				#f.write(str(deref_value)+"\n")
				#val='EX'
		else:
			var="var"
			val=i[1].strip()
		if val==0:
			val=1005

		#print("HEREv",val)

		sepdi['id']=ID
		sepdi['type']=var
		sepdi['data_type']=datatype.strip()
		sepdi['name']=i[0].strip()
		
		if is_struct and '*' not in datatype:
			fields = struct_fields_info(p1, datatype)
			pat = re.compile(r'\s*<.*?>')
			val = re.sub(pat, '', val)
			reg = re.compile(r'0x[0-9a-f]*[,}]') #pattern to find hexadecimals in val, => they are pointers and we need to replace it with ID
			l = reg.findall(val)
			l = [x[0:-1] for x in l]
			for addr in l:
				ID = int(addr,16)
				if ID in addr_to_id:
					ID = addr_to_id[ID]
					#f.write("\n=====\naddr:"+addr+"\nID:"+str(ID)+"\nval:"+val+"\n=====\n\n")
				
	#			elif addr in heap:
	#				ID = 'HEAPVAR -'+addr
					if addr in heap:
					#	#val = 'HEAPVAR -'+addr
					#	deref_val = get_deref_value(addr, datatype)
					#	heap[addr]['val'] = deref_val
						heap[addr]['id'] = ID	
						
				elif ID == 0:	# hexadecimal 0x0 i.e 0 corresponds to NULL
					ID = 'N'
				else:
					ID = 'U'#addr
				val = val.replace(addr, str(ID))
			#print("HEREv1",val)
			#sepdi['val'] = val #val is string -> '{data = 123, next = U}'
			sepdi['val']=val.replace("{","[").replace("}","]")
			
			
			# string processing to make val a list of dictionary(key is variable name value is value)
			s = sepdi["val"]
			print("before",s)
			s = s.strip()[1:-1] #s.strip("{}")
			print("after",s)
			#v = ["{"+x.replace("=",":")+"}" for x in s.split(",")]
			'''
			ISSUE:
			('before', '{g = {{1804289383, 846930886}, {1681692777, 0}}}')
			('after', 'g = {{1804289383, 846930886}, {1681692777, 0')
			The problem is that split doesn't work for arrays, we need to find a new way to do stuff
			'''

			#REGEX SPLITTING assuming that a variable name doesn't start with
			#a number
			v=[]
			n=len(s)
			index=0
			curstack=0
			curword=""
			while(index<n):
				i=s[index]
				if i==",":
					curwordi=curword.replace("=",":")
					for word in re.findall("[a-zA-Z_][a-zA-Z_0-9]*",curword):
						curwordi=curwordi.replace(word,'"'+word+'"')
					
					v.append("{"+curwordi+"}")
					curword=""
					index+=1
				elif i=="{":
					curstack+=1
					while(index<n and curstack):
						curword+=s[index]
						if s[index]=="{":
							curstack+=1
						elif s[index]=="}":
							curstack-=1
						index+=1
				else:
					curword+=s[index]
					index+=1
			if curword:
				curwordi=curword.replace("=",":")
				for word in re.findall("[a-zA-Z_][a-zA-Z_0-9]*",curword):
					curwordi=curwordi.replace(word,'"'+word+'"')
				v.append("{"+curwordi+"}")
				curword=""


			x = []
			print("HEREv",v)
			for i in v:
				print(i)
				k=i.strip()[1:-1]
				count_of_colons=k.count(":")
				if count_of_colons>1:#represents that it is an object of a structure
					#the structure is of the form
					#{edge_weights : {{17, 28}, {24, 26}}, vertex_weights : {4, 4}}
					#so we split by '},' : WRONG
					dicttobedumped={}
					for field in k.split(',"'):
						if field[0]=="{":
							field=field[1:]
						else:
							field='"'+field
						field=field.replace('"',"").split(":")
						try:
							dicttobedumped[field[0].strip()]=json.loads(field[1].strip().replace(" ","").replace("{","[").replace("}","]"))
						except:
							pass
					x.append(dicttobedumped)
					
				else:
					k=k.split(":")
					try:
						x.append({k[0].strip():k[1].strip().replace(" ","")})
					except:
						pass
			print("HEREv2",val)
			sepdi['val'] = x
			print("HEREv3",sepdi['val'],x)
			#
			k = 0
			for i in range(len(fields)):
				if fields[i]['type'] == 'ptr':
					address = l[k]
					if address in heap:
						dt = fields[i]['data_type']
						heap[address]['val'] = get_deref_value(address, dt) 
						heap[address]['data_type'] = dt[: dt.rfind('*')].strip()
						
						if '*' in heap[address]['data_type']:
							heap[address]['type'] = "ptr"
						else:
							heap[address]['type'] = "var"
					k += 1			
			#
			#f.write("\n-----\n"+str(l)+"\n")
			#f.write(val + "\n")
		#di['Global Variables'][ID]=[i[0],i[2][1:i[2].rfind('*')],i[1]] #i[0] will hold the variable name
		#i[1] will hold its value and we have assumed that the address is uinque
		di['Contents'].append(sepdi.copy())
		print("SEPDI",sepdi)
		del sepdi

def vdisp(gl,sl,al,ln,fname,rv):#Global, Local and Argument Variables Display
	#rv contains gl,sl,al,ln,fname, function can be altered with lesser arguments
	print "\n",ln
	#print("RV",rv)
	fn = copy.deepcopy(fname)
	ln = 0
	global id_counter
	try:
		ln = int(lnc.split()[1]) #next line to execute
		ln = prev_lineno
	except:
		#f.write("\nline: "+str(lnc)+"\n")
		#ln = prev_lineno
		return
	#di["Contents"]={}
	
	#Global Variables
	if len(gl)>0:
		print '\n(Global Variables)'
		heading = ["VARIABLE","VALUE","ADDRESS"]
		print(tabulate(gl,headers=heading,tablefmt="psql"))
		di = {}
		maketogether(ln,di,gl,"GlobalVariables")
		lines_data.append(di.copy())
		del di
	
	# keep it after stack variables so that it has updated content
	'''
	#heap
	di = {}
	di["LineNum"] = ln
	di["type"] = "Heap"
	#di['Contents'] = heap.copy()
	### made contents a list of dictionaries -> where each dictionary is the value field in heap 
	di['Contents'] = list(heap.values())
	#lines_data.append(di.copy())
	lines_data.append(copy.deepcopy(di))
	del di
	'''
	
	#Function
	if len(fname) > 0:
		fn = fname[-1]
	
	if len(fn) > 1:
		print "\nFunction Name: ",fn[0],"\nFunction Address: ",fn[1]
		#ID = int(fn[1][fn[1].rfind(")")+2:fn[1].rfind("<")-1],16)
		FunctionID = fn[1]
		if FunctionID not in addr_to_id:
			addr_to_id[FunctionID] = id_counter
			id_counter += 1
		FunctionID = addr_to_id[FunctionID]

		fnameID = fn[0]
		if fnameID not in addr_to_id:
			addr_to_id[fnameID] = id_counter
			id_counter += 1
		fnameID = addr_to_id[fnameID]
		di = {"LineNum":ln, "type":"Function", "name": fn[0], "id":FunctionID, "nameid":fnameID, "stackdepth":stack_depth}
		lines_data.append(di.copy())
		del di
	
	#Stack variables
	if len(sl)+len(al)>0:
		temp=copy.copy(sl)+copy.copy(al)
		print '\n(Stack Frame)'
		heading = ["VARIABLE","VALUE","ADDRESS"]
		print(tabulate(sl,headers=heading,tablefmt="psql"))
		di={}
		maketogether(ln,di,temp,"StackFrame")
		
		#heap
		h_di = {}
		h_di["LineNum"] = ln
		h_di["type"] = "Heap"
		#di['Contents'] = heap.copy()
		### made contents a list of dictionaries -> where each dictionary is the value field in heap 
		h_di['Contents'] = list(heap.values())
		#lines_data.append(di.copy())
		lines_data.append(copy.deepcopy(h_di))
		del h_di
		
		lines_data.append(di.copy())
		del di
	
	
	#Arguments
	# if len(al)>0:
	# 	print '\n(Arguments)'
	# 	heading = ["VARIABLE","VALUE","ADDRESS"]
	# 	print(tabulate(al,headers=heading,tablefmt="psql"))
	# 	di={}
	# 	maketogether(ln,di,al,"Arguments")
	# 	lines_data.append(di.copy())
	# 	del di
		
	if len(rv[6])>0:
		print '\n-Pointers-'
		heading = ["Line\nNo.","Function\nName/Address\n(Pointer)","Pointer\nName/Address/Value","Variable\nPointed to\nName/Address","Value of\nVariable\nPointed to","Function\nName/Address\n(Variable Pointed to)"]
		print(tabulate(rv[6],headers=heading,tablefmt="psql"))
	
	di = {"LineNum":ln,"STDOUT":print_stmts[0]}
	print_stmts[0] = ""
	lines_data.append(di.copy())
	del di

	
	#print(di)
	'''
	f1.write(json.dumps(di,indent=4))
	f1.write("\n".join([str(i) for i in rv[6]]))
	f1.write("\n--------------------------------------------\n")
	'''
	#f1.close()


def linkall(gl,sl,al,ln,fn):#links pointers and displays it
	global tsav2
	global tsav11
	global cc11
	ck=[]
	c=0
	if len(fn)>0:
		fn=fn[-1]
	a4=[]
	tsav11.append(a4)
	fnc=copy.deepcopy(fn)
	global tsav
	for i in gl:
		for j in gl:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				tsav.append([ln,"-",i[0],i[1],i[2],j[0],j[1],j[2],"-"])
				tsav11[cc11].append([ln,"-",i[0],i[1],i[2],j[0],j[1],j[2],"-"])
			c+=1
	for i in sl:
		for j in gl:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				tsav.append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],"-"])
				tsav11[cc11].append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],"-"])
			c+=1
	for i in sl:
		for j in sl:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				tsav.append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
				tsav11[cc11].append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
			c+=1
	for i in sl:
		for j in al:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				tsav.append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
				tsav11[cc11].append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
			c+=1
	for i in al:
		for j in gl:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				ck.append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
			c+=1
	for i in al:
		for j in sl:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				ck.append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
	for i in al:
		for j in al:
			tv=j[2].split(" ")
			tv=tv[2]
			if i[1]==tv:
				ck.append([ln,fn,i[0],i[1],i[2],j[0],j[1],j[2],fn])
	s1=''
	s2=[]
	if len(tsav)>0:
		tsav14=copy.deepcopy(tsav11)
		if len(tsav11[-1])==0:
			tsav12=copy.deepcopy(tsav11)
			cz=0
			for iz in tsav12:
				if len(iz)==0:
					del tsav12[cz]
				cz+=1
			cz=0
			if len(tsav12)>0:
				tsav14=copy.deepcopy(tsav12)
		
		for ui in tsav14[-1]:
			z=ui
			n=z[2]
			a=z[3]
			k1=z[4]
			for il in al:
				ac=il[1].split(" ")
				if " " in il[1] and len(il[1])>3:
					ac=ac[2]
				if a==ac[0]:
					lc1=ui
					if fnc!=z[8]:
						tsav.append([ln,fnc,il[0],z[3],z[4],z[5],z[6],z[7],z[8]])
						tsav11[cc11].append([ln,fnc,il[0],z[3],z[4],z[5],z[6],z[7],z[8]])
					lc1=[]
				c+=1
	if len(ck)>0:
		for i in ck:
			if len(i)>0:
				tsav.append(i)
				tsav11[cc11].append(i)
	tsav2=copy.deepcopy(tsav)
	z=[]
	tsavd=[]
	cc11+=1
	tsdisp=copy.deepcopy(tsav11[-1])
	tsdispv=[]
	if len(tsdisp)>0:
		for i in tsdisp:
			tsdispv.append([i[0],i[1][0],i[2],i[5],i[6],i[8][0]])
			tsdispv.append(["",i[1][1],"","","",i[8][1]])
	return [gl,sl,al,ln,fn,tsav11,tsdispv]

f = open('test.txt','w')


'''
type = struct example1 {
int a;
struct example2 b;
}
(gdb)
'''

def struct_fields_info(pipe, structure):
	pipe.stdin.write('ptype '+structure+'\n')
	my_out = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out += read(pipe.stdout.fileno(), 1024)
		except OSError:
			break
	my_out = string.replace(my_out,'(gdb)','')
	my_out = my_out.strip()
	fields = my_out[my_out.find('{')+2 : my_out.find('}')-1].split('\n')
	fields = [i.strip(' ;') for i in fields]
	fields_info = []
	for i in fields:
		info = {}
		if '*' in i:
			info['type'] = 'ptr'
			'''
			if "(*)" in i:
				info['data_type'] = 
			'''
			info['data_type'] = i[0 : i.rfind('*') + 1]
			info['name'] = i[i.rfind('*') + 1 : ]
		else:
			info['type'] = 'var'
			info['data_type'] = i[0 : i.rfind(' ')]
			info['name'] = i[i.rfind(' ') + 1 : ]
		fields_info.append(info.copy())
	
	# f.write(str(fields)+"\n")
	# return fields
	# f.write(str(fields_info))
	return fields_info


def output(p1,flag):#display (stack frame, arguments..)
	global stop
	my_out = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out+= read(p1.stdout.fileno(), 1024)
		except OSError:
			# the os throws an exception if there is no data
			# print '[No more data]'
			break
	
	
	#if "malloc" in my_out or "free" in my_out:
	for i in skip_fn:
		if i in my_out:
			global use_next
			use_next = 1
			break
	
	
	if "scanf" in my_out:
		global scanf
		scanf = 1
	if "printf" in my_out:
		print "Output from printf is:"
		print_stmts[0] = ""
		op_string = my_out[11:len(my_out)-9].split(",")
		i = 0
		i_args = 1
		format_string = op_string[0]
		format_string = string.replace(format_string,'"','')
		while i<len(format_string):
			if format_string[i] == '%':
				temp = 'print '+op_string[i_args]+'\n'
				p1.stdin.write(temp)
				sleep(time_to_sleep)
				output(p1,5)
				i_args += 1
				i +=2
				continue
			#sys.stdout.write(format_string[i])
			#print_stmts[0] += format_string[i]
			i += 1
		print 'PRINT EXECUTED \n'
	global ret
	m = func.match(my_out) #foo (a=1, p=0x7fffffffddfc, d=0x7fffffffddf8)
	if m is not None:
		# prints function name/address like-> [['foo', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
		my_out = m.group()
		func_name,my_out = my_out.split('(')
		my_out = my_out.split(')')[0]
		my_out = my_out.split(',') #myout-> ['a=1','p=0x7fffffffddfc','d=0x7fffffffddf8']
		func_name = string.replace(func_name,' ','') #funcname -> foo
		fname.append([func_name])

		print "Function '",func_name,"' with Arguments:"
		var_tab = []
		for arg in my_out:
			var_tab.append(arg.strip().split("=",1)) #appends [variable_name, value] for all args
		if len(var_tab)>0:
			heading = ["ARGUMENT","VALUE"]
			print(tabulate(var_tab,headers=heading,tablefmt="psql"))
		mp = copy.deepcopy(my_out)	#mp-> ['a=1','p=0x7fffffffddfc','d=0x7fffffffddf8']
		s = "p &"+func_name+"\n"
		p1.stdin.write(s)	# p &foo\n
		my_out = ''
		sleep(time_to_sleep)
		while True:
			try:
				my_out += read(p1.stdout.fileno(), 1024) #p &foo-> $1 = (int (*)(int, int *, int *)) 0x400bb6 <foo>\n(gdb) 			
			except OSError:
				break

		my_out = string.replace(my_out,'(gdb)','').strip() # $1 = (int (*)(int, int *, int *)) 0x400bb6 <foo>
		my_out = my_out.split("\n")	# ['$1 = (int (*)(int, int *, int *)) 0x400bb6 <foo>']
		my_out = [ x.split('=',1) for x in my_out ] # [['$1 ', ' (int (*)(int, int *, int *)) 0x400bb6 <foo>']]
		'''
		my_out = "\n"+my_out
		iters = re.finditer(pattern,my_out)
		iters = list(iters)
		newout = []
		for index in range(len(iters)-1):
			newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
		
		if iters:
			newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
		my_out = [ x.split('=',1) for x in newout ]
		'''

		for x in range(len(my_out)):
			my_out[x] = [y.strip() for y in my_out[x]] # [['$1', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
		my_out = filter(lambda a : len(a) == 2,my_out) # [['$55', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
		mo = copy.deepcopy(my_out)	
		mo[0][0]=func_name #mo-> [['foo', '(int (*)(int, int *, int *)) 0x400bb6 <foo>']]
		#f.write(str(mo))
		#f.close()
		print "Function Name/Address: ",mo
		mo = []
		return
	if 'result = 0' in my_out:
		stop = 1
		return
	if 'Value returned is' in my_out:
		my_out = my_out.split(' ')
		print '\n\nReturn Value:',my_out[len(my_out)-2].split('\n')[0],'\n'
		ret = 0
		return
	if 'return' in my_out:
		ret = 1
		return 
	if flag == 6: # 'print '+i+'\n' #i-> global variable # $2 = 0\n(gdb)
		# returns value of the global variable
		my_out = my_out.split('=')[1] #  0\n(gdb)
		my_out = string.replace(my_out,'(gdb)','') #  0\n
		my_out = string.replace(my_out,'\n','') #  0
		return my_out # 0
	if flag == 5:
		my_out = my_out.split('=')[1]
		my_out = string.replace(my_out,'(gdb)','')
		my_out = string.replace(my_out,'\n','')
		print("HEREEEEEEEEEEEGGGGGG")
		print_stmts[0] += my_out
		sys.stdout.write(my_out)

	elif flag == 2: #for info line
		# stores current line no in lnc
		my_out = string.replace(my_out,'(gdb)','') # Line 12 of "./b.c" starts at address 0x400bb6 <foo> and ends at 0x400bc9 <foo+19>.\n(gdb)
		my_out = my_out.split(' ')
		my_out = my_out[:2]
		ln=' '.join(my_out) #Line 28
		#f.write('\n'+ln)

		#print "\n"
		#print ln
		global lnc
		global prev_lineno
		try:
			prev_lineno = int(lnc.split()[1])		
		except:
			#f.write("\nprev: "+str(lnc)+"\n")
			prev_lineno = 0
		lnc=ln

	elif flag == 1: # info locals
		'''
		p = 0x401a50 <__libc_csu_fini>
		l = 0x0
		k = 4195328
		x = 0
		ret = 4200880
		z = 0
		(gdb)
		'''
		if my_out != 'No symbol table info available.\n(gdb) ':
			#print("MYout moh",my_out)
			my_out = string.replace(my_out,'(gdb)','')
			my_out = my_out.strip()
			#f.write(str(my_out)+'\n')
			#print '\n(Stack Frame)'
			#print("MYOUT OH",my_out)
			#my_out = my_out.split("\n") # ['p = 0x401a50 <__libc_csu_fini>', 'l = 0x0', ...]
			#my_out = re.split('\n[a-zA-Z_]',my_out)
			#f.write(str(my_out)+'\n')
			#print("MYOUT HO",my_out)
			#my_out = [ x.split('=',1) for x in my_out ] # [['p ', ' 0x401a50 <__libc_csu_fini>'], ['l ', ' 0x0'], ...]
			#f.write(str(my_out)+'\n')

			my_out = "\n"+my_out
			iters = re.finditer(pattern,my_out)
			iters = list(iters)
			newout = []
			for index in range(len(iters)-1):
				newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
			if iters:
				newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
			my_out = [ x.split('=',1) for x in newout ]

			for x in range(len(my_out)):
				my_out[x] = [ y.strip() for y in my_out[x] ] # [['p', '0x401a50 <__libc_csu_fini>'], ['l', '0x0'], ...]
			#f.write(str(my_out)+'\n')
			prev = 0
			print("MYOUT",my_out)
			if len(my_out)==2 and len(my_out[0])==1 or my_out[0][0]=="No locals.":
				print "\nNo Locals.\n"
			else:	
				for x in range(len(my_out)):
					if len(my_out[x])!= 2:
						if len(my_out[x]) == 1:
							try: # error happens mostly when time_to_sleep is not large enough
								my_out[prev][1] += my_out[x][0]
							except:
								print("TIME SLEEP",my_out,prev,x,prev_lineno)
					else:
						prev = x
				my_out = filter(lambda a: len(a) ==2, my_out)
				#f.write(str(my_out)+'\n')
				mp = copy.deepcopy(my_out) # mp-> [['p', '0x401a50 <__libc_csu_fini>'], ['l', '0x0'], ...]
				#heading = ["VARIABLE","VALUE"]
				#print(tabulate(my_out,headers=heading,tablefmt="psql"))
				global sn
				sn=len(my_out)
				for i in mp:
					vallv.append(i)
				mp = []
				mo = []
				ml = []
				mp = copy.deepcopy(my_out)	
				for j in my_out:
					s = "p &"+j[0]+"\n"
					p1.stdin.write(s)	
				my_out = ''
				sleep(time_to_sleep)
				while True:
					try:
						my_out += read(p1.stdout.fileno(), 1024)
					except OSError:
						break
				print("MYOUT HERE",my_out)
				my_out = string.replace(my_out,'(gdb)','').strip() # $9 = (int **) 0x7fffffffde08\n$10 = (int **) 0x7fffffffde10\n..
				my_out = my_out.split("\n") # ['$9 = (int **) 0x7fffffffde08', '$10 = (int **) 0x7fffffffde10', ..]
				my_out = [ x.split('=',1) for x in my_out ] # ['$9 ', ' (int **) 0x7fffffffde08'], ['$10 ', ' (int **) 0x7fffffffde10'], ...]
				'''
				my_out = "\n"+my_out
				iters = re.finditer(pattern,my_out)
				iters = list(iters)
				newout = []
				for index in range(len(iters)-1):
					newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
				if iters:
					newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
				my_out = [ x.split('=',1) for x in newout ]
				'''

				for x in range(len(my_out)):
					my_out[x] = [ y.strip() for y in my_out[x] ] # ['$9', '(int **) 0x7fffffffde08'], ['$10', '(int **) 0x7fffffffde10'], ...]
				my_out = filter(lambda a : len(a) == 2,my_out) # ['$9', '(int **) 0x7fffffffde08'], ['$10', '(int **) 0x7fffffffde10'], ...]
				mo = copy.deepcopy(my_out)	#mo-> ['$9', '(int **) 0x7fffffffde08'], ['$10', '(int **) 0x7fffffffde10'], ...]
				c = 0
				for i in mp:
					'''
					try:
						a = mo[c][1] # '(int **) 0x7fffffffde08'
						ml.append([i[0],a]) # [['p', '(int **) 0x7fffffffde08'], ['l', '(int **) 0x7fffffffde10'], ...]
						c+=1
					except:
						print("ERROR at SPACING",my_out,mo,c,mp)
					'''
					a = mo[c][1] # '(int **) 0x7fffffffde08'
					ml.append([i[0],a]) # [['p', '(int **) 0x7fffffffde08'], ['l', '(int **) 0x7fffffffde10'], ...]
					c+=1
				c = 0
				#print ml
				for i in ml:
					vall.append(i) # vall-> [['name', 'address'], ['name', 'address'], ..]
		else:
			stop = 1
	elif flag == 4: # info args
		'''
		a = 1
		p = 0x7fffffffddfc
		d = 0x7fffffffddf8
		(gdb)
		'''
		my_out = string.replace(my_out,'(gdb)','').strip()
		if my_out != "No arguments.":
			#print "\n(Arguments)"
			#my_out = my_out.split("\n")
			#my_out = [ x.split('=',1) for x in my_out ]

			my_out = "\n"+my_out
			iters = re.finditer(pattern,my_out)
			iters = list(iters)
			newout = []
			for index in range(len(iters)-1):
				newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
			if iters:
				newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
			my_out = [ x.split('=',1) for x in newout ]

			for x in range(len(my_out)):
				my_out[x] = [ y.strip() for y in my_out[x] ]
			my_out = filter(lambda a : len(a) == 2,my_out)
			mp = []
			mo = []
			ml=[]
			mp = copy.deepcopy(my_out)
			if my_out>0:
				#heading = ["ARGUMENT","VALUE"]
				#print(tabulate(my_out,headers=heading,tablefmt="psql"))
				print ""
			global an
			an=len(my_out)
			for i in mp:
				vallv.append(i)
			for j in my_out:
				s = "p &"+j[0]+"\n"
				p1.stdin.write(s)	
			my_out = ''
			sleep(time_to_sleep)
			while True:
				try:
					my_out = read(p1.stdout.fileno(), 1024)
				except OSError:
					break
			my_out = string.replace(my_out,'(gdb)','').strip()
			my_out = my_out.split("\n")
			my_out = [ x.split('=',1) for x in my_out ]
			'''
			my_out = "\n"+my_out
			iters = re.finditer(pattern,my_out)
			iters = list(iters)
			newout = []
			for index in range(len(iters)-1):
				newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
			if iters:
				newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
			my_out = [ x.split('=',1) for x in newout ]
			'''
			for x in range(len(my_out)):
				my_out[x] = [ y.strip() for y in my_out[x] ]
			my_out = filter(lambda a : len(a) == 2,my_out)
			mo = copy.deepcopy(my_out)	
			c = 0
			for i in mp:
				a = mo[c][1]
				ml.append([i[0],a])
				c+=1
			c = 0
			#print ml
			for i in ml:
				vall.append(i)


# dictionary of structure containing its fields, the structure name 
# recognize only if we are using standard ways to determine the data structures
#assumed that graph is represented as a 2D matrix
def identify_datastructure(structure, structure_name):
	count_of_same_pointers=0
	count_of_diff_pointers=0
	name_of_same_pointers=[]
	name_of_diff_pointers=[]

	print("IDENTIFY",structure)

	a=structure_name.lower()
	
	if "graph" in a:
		return "graph"

	if "tree" in a or "binary" in a:
		return "tree"
	if "dll" in a or "doubl" in a:
		return "doubly_linked_list"
	
	for field in structure['fields']:
		#print("tpye",field)
		dt = field['data_type']
		if field['type'] == 'ptr':
			if structure_name == dt[ : dt.rfind('*') - 1]:
			#struct_details[structure].append({'datastructure':'linkedlist'})
			#struct_details[structure]['datastructure'] ='linkedlist'
				count_of_same_pointers+=1
				name_of_same_pointers.append(field['name'].lower())
			else:
				count_of_diff_pointers+=1
				name_of_diff_pointers.append(field['name'].lower())
		if re.findall(r"\[[0-9]+\]\[[0-9]+\]",field["name"]):
			return "graph"

	if count_of_same_pointers==1:
			return 'linkedlist'
	elif count_of_same_pointers==2:#by default we send a dou

			#can be a doubly linked list or a binary tree
			#difference between doubly linked list and binary tree :
			#a node in a doubly linked list is pointed at twice: by it's previous' next and next's previous
			#a node in a binary tree is pointed at once: by it's parent
			#also from what we have learnt: binary trees have a separate structure called tree to store the head
			#EDGE CASE: What if binary trees' node has a parent field? => count_of_same_pointers = 3
			#tree is a connected graph with no cycles
			#attempt1: based on name of the pointers
			#assuming left and right are in binary trees
			#next and prev are in doubly linked lists
			if 'next' in name_of_same_pointers and 'prev' in name_of_same_pointers:
				return 'doubly_linked_list'
			return 'tree'			
	else:
		return 'tree'
		'''
		if name_of_diff_pointers:
			return 
		'''
		
			
			

			


def get_heap_info(pipe):
	l = [] # store all the malloced addresses in current iteration
	global id_counter 
	pipe.stdin.write('p resrsasr_i\n')
	my_out = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out += read(pipe.stdout.fileno(), 1024)
		except OSError:
			break
	my_out = string.replace(my_out,'(gdb)','')
	my_out = my_out.strip()
	heap_i = int(my_out[my_out.rfind('=')+2:])
	for i in range(heap_i):
		pipe.stdin.write("p resrsasr["+str(i)+"]\n")
		my_out = ''
		sleep(time_to_sleep)
		while True:
			try:
				my_out += read(pipe.stdout.fileno(), 1024)
			except OSError:
				break
		my_out = string.replace(my_out,'(gdb)','')
		my_out = my_out.strip()
		loc =  my_out[my_out.find('=')+2:]
		loc = loc[loc.rfind(' ')+1:]
		if int(loc, 16) not in addr_to_id:
			addr_to_id[int(loc,16)] = id_counter
			id_counter+=1
		#heap.add(loc)
			heap[loc] = {}
		l.append(loc)
	
	for addr in heap.keys():
		if addr not in l:
			del heap[addr]
			del addr_to_id[int(addr,16)]
			# heap.pop(addr)
			# f.write("\nHere: "+str(addr)+"\t"+str(l)+"\n" + "heap: "+str(heap)+"\n")
	#f.write(str(heap)+"\n")
	
p1.stdin.write('break main\n')
output(p1,0)
p1.stdin.write('run\n')
output(p1,0)

starttime = curtime = timeit.default_timer()

while (curtime-starttime < time_limit): 
	#inp = raw_input()
	mo=[]
	mp=[]
	ml=[]
	#if(inp=='exit' or inp=='quit' or inp=='q'):
	#	break
	
	
	'''
	p1.stdin.write('step\n')
	counter+=1
	hista.append([str(counter)])
	if scanf == 1:
		print "Enter input for scanf:\n"
		p1.stdin.write(str(input())+'\n')
		scanf = 0
	output(p1,0)'''

	hista.append([str(counter)])
	if scanf == 1:
		print "Enter input for scanf:\n"
		p1.stdin.write(str(input())+'\n')
		scanf = 0
	output(p1,0)
	
	
	#
	#p1.stdin.write('p resrsasr_i')
	#get_heap_info()
	try:
		get_heap_info(p1)
	except Exception as e:
		f.write("\nEXCEPT "+str(e))
		#break
	#
	
	
	p1.stdin.write('info line\n')
	output(p1,2)
	
	#print '\n(Global Variables)'
	var_tab=[]
	#heading = ["VARIABLE","VALUE"]
	for i in global_name_list:
		if "rsrsaser" in i:
			continue
		p1.stdin.write('print '+i+'\n')
		var_tab.append([i,output(p1,6)]) # [['name','value'],['name','value'],...] for all global variables
	#print(tabulate(var_tab,headers=heading,tablefmt="psql"))
	vallv = copy.deepcopy(var_tab) # [['name','value'],['name','value'],...]
	#f.write(str(mp)+'\n')
	for i in mp:
		vallv.append(i)
	mp = copy.deepcopy(var_tab)	
	#f.write(str(mp)+'\n')
	for j in var_tab:
		s = "p &"+j[0]+"\n"
		p1.stdin.write(s)
	my_out = ''
	sleep(time_to_sleep)
	while True:
		try:
			my_out += read(p1.stdout.fileno(), 1024) # $3 = (int *) 0x6bc3a0 <g>\n(gdb)
		except OSError:
			break
	my_out = string.replace(my_out,'(gdb)','').strip() # $3 = (int *) 0x6bc3a0 <g>\n
	my_out = my_out.split("\n") # ['$3 = (int *) 0x6bc3a0 <g>', '$4 = (int *) 0x6bc3a0 <g>', ..]
	my_out = [ x.split('=',1) for x in my_out ] # [['$3 ', ' (int *) 0x6bc3a0 <g>'], ['$4 ', ' (int *) 0x6bc3a0 <g>'], ...]
	'''
	my_out = "\n"+my_out
	iters = re.finditer(pattern,my_out)
	iters = list(iters)
	newout = []
	for index in range(len(iters)-1):
		newout.append(my_out[iters[index].start()+1:iters[index+1].start()].replace("\n","").replace(" ",""))
	if iters:
		newout.append(my_out[iters[-1].start()+1:].replace("\n","").replace(" ",""))
	my_out = [ x.split('=',1) for x in newout ]
	'''
	for x in range(len(my_out)):
		my_out[x] = [ y.strip() for y in my_out[x] ] # [['$3', '(int *) 0x6bc3a0 <g>'], ['$4', '(int *) 0x6bc3a0 <g>'], ...]
	my_out = filter(lambda a : len(a) == 2,my_out)
	mo=copy.deepcopy(my_out) # [['$3', '(int *) 0x6bc3a0 <g>'], ['$4', '(int *) 0x6bc3a0 <g>'], ...]
	c = 0
	for i in mp: # mp-> [['name', 'value'], ['name', 'value'],...]
		a = mo[c][1] # '(int *) 0x6bc3a0 <g>'
		ml.append([i[0],a]) # ['g', '(int *) 0x6bc3a0 <g>']
		c+=1
	c = 0
	#print ml
	# ml-> [['name','address'],['name','address'],...]
	vall = copy.deepcopy(ml) # [['name','address'],['name','address'],...]
	mo=[]
	mp=[]
	ml=[]
	p1.stdin.write('info locals\n')
	output(p1,1)
	p1.stdin.write('info args\n')
	output(p1,4)	
	
	fname.extend(tr())
	sv.extend([counter])
	sv.extend(fname)
	svc.extend(sv)
	sv=[]
	cl=0
	for u in vallv:
		try:
			val.append([u[0],u[1],vall[cl][1]])
			cl+=1
		except:
			break
	cl=0	
	hista.append(fname)
	hista.append(val)
	val=[]
	
	if gn>0:
		hista[2].insert(0,["#G"])
	if sn>0:
		hista[2].insert(gn+1,["#S"])
	if an>0:
		hista[2].insert(gn+sn+2,["#A"])
	gvp1=[]
	svp1=[]
	avp1=[]
	gvc1=0
	svc1=0
	avc1=0
	for i in hista[2]:
		if gvc1<=gn:
			gvp1.append(i)
			gvc1+=1
		elif svc1<=sn:
			svp1.append(i)
			svc1+=1
		elif avc1<=an:	
			avp1.append(i)
			avc1+=1
	if len(gvp1)>0:
		del gvp1[0]
	if len(svp1)>0:
		del svp1[0]
	if len(avp1)>0:
		del avp1[0]
	rv=linkall(gvp1,svp1,avp1,lnc,fname)
		
	
	vdisp(gvp1,svp1,avp1,lnc,fname,rv)
	pdisp(rv)
	
	#lnc=0
	
	sn=0
	an=0
	histac.append(hista)
	hista=[]
	fname=[]
	if stop == 1:
		#for i in structures:
		#	#p1.stdin.write('ptype '+i+'\n')
		#	fields_list = struct_fields_info(p1, i.strip())
		#	struct_details[i.strip()] = fields_list
		i = 0
		while i < len(structures):
			fields_list = struct_fields_info(p1, structures[i].strip())
			#struct_details[structures[i].strip()] = fields_list
			name = structures[i].strip()
			struct_details[name] = {}
			struct_details[name]['fields'] = fields_list
			struct_details[name]['datastructure'] = identify_datastructure(struct_details[name], name)	#
			
			for x in fields_list:
				if 'struct' in x:
					x = x[0 : x.rfind(" ") + 1]
					if x not in structures:
						structures.append(x)
			i += 1
		break
	if ret == 1:
		p1.stdin.write('finish\n')
		output(p1,3)
	
	
	f.write(str(heap)+"\n\n")
	
	
	#moved step to the end of loop
	if use_next == 1:
		use_next = 0
		p1.stdin.write('next\n')
	else:
		p1.stdin.write('step\n')
	counter+=1

	print '\nHit Enter to Continue, exit/quit to stop\n'
	curtime=timeit.default_timer()


# adding possible data structure type in struct_details
# doing this using identify_datastructure function 
'''
for structure in struct_details:
	for field in struct_details[structure]['fields']:
		dt = field['data_type']
		if field['type'] == 'ptr' and structure == dt[ : dt.rfind('*') - 1]:
			#struct_details[structure].append({'datastructure':'linkedlist'})
			struct_details[structure]['datastructure'] ='linkedlist'
			break
'''

#print("\nLINES DATA",lines_data,"\n")
maindic = {"Lines_Data":lines_data}
maindic["Structures"] = struct_details
maindic = json.dumps(maindic,indent=2)


f1=open(final_file,"w")
f1.write(maindic)
f1.close()
remove(my_file[:-1]+"o")

