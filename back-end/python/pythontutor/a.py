'''
class A:
  def __init__(self):
    self.x = 10
    self.y = 20
  
def recurse(a):
  if a==0:
    return 0
  return a&1 + recurse(a//2)

z=4565
a = A()
a.x = 100
a.y = 200

b = A()
b.x = 1000
b.y = 2000
'''
'''
class A:
  def __init__(self):
    self.x = 10
    self.y = 20

def recurse(a):
  return "Hello"

z=A()
'''
def foo():
	def bar():
		print("hello")
	bar()

def recurse(a):
  if a==0:
    return 0
  return a%2 + recurse(a//2)

print(recurse(1024))

foo()

while True:
	print()
