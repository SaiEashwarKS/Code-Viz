l=[ 'e = {a = 0, b = {a = 7049240, b = 0}}','f = {a = 0, b = {a = 7049240, b = 0}}',]
l1=['e1 = {a = -8376, b = {a = 32767, b = {4195328, 0, 4200592, 0, 4200752}}}']
from json import loads,dumps
def recurse(i,cur_str,ans,level=0):
    if '{' in i:
        # i.strip("{}")
        print(i)
        for j in i.split(chr(126+level)):
            print(j)
    #print(i)

for j in l1:
    ele,typ=j.split("=",1)
    ele,typ=ele.strip(),typ.strip()
    if '{' not in typ:
        #other stuff
        pass
    else:
        #for the recursion I wanted to have good split parameter, so started with character number 126 (upto character number 255 can be unicode)
        #impling we can have 130 elements
        ans=[]
        level=0
        typ=list(typ)
        typ=typ.replace()

