import subprocess
import re
import json

#assuming struct will be defined as <typedef>?struct struct_name{....}<typedefed_name>;
my_file = "./teststruct.c"
p = subprocess.Popen(['cat', my_file], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out,err=p.communicate()
r1=re.findall(r'struct[^\}]*\}',out,re.DOTALL)#[^\}] matches all characters except }
for i in range(len(r1)):
    r1[i]=r1[i].replace("\n","")
    r1[i]=r1[i].replace("\t","")
di={}
for i in r1:
    spacei=i.index(" ")
    bracei=i.index("{")
    endbracei=i.index("}")
    di["struct "+i[spacei+1:bracei]]=i[bracei+1:endbracei-1].split(";")
print(json.dumps(di))