l=[ 'f = {a = 0, b = {a = 7049240, b = 0}}']
l1=['e1 = {a = -8376, b = {a = 32767, b = {4195328, 0, 4200592, 0, 4200752}}}']

from json import loads,dumps
def recurse(long_str,cur_str,ans,ind=0):
    cur_stack=[]
    if '{'==long_str[ind]:
        for i in long_str[ind+1:]:
            if i==",":
                ans.append("".join(cur_str+cur_stack))
                cur_stack=[]
            elif i=="{":
                cur_str+=cur_stack[-2]+"."
                cur_stack=[]
            elif i=="}":
                if cur_str+cur_stack:
                    if cur_stack:
                        ans.append("".join(cur_str+cur_stack))
                    cur_stack=[]
                    cur_str=list(cur_str)[:-2]
            else:
                cur_stack.append(i)
            #print(cur_stack,cur_str,ans)
    if cur_str+cur_stack:
        if cur_stack:
            ans.append("".join(cur_str+cur_stack))
        cur_stack=[]
    print(ans)

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
        typ=typ.replace(" ","")
        recurse(typ,[],ans)

