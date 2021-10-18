class node:
    def __init__(self,val=0):
        self.left = None
        self.right = None
        self.val = val
    
def mirror(node):
    if node:
        node.left,node.right = mirror(node.right),mirror(node.left)
    return node

head = node(10000)
head.left = node(9000)
head.right = node(11000)
head.left.left = node(8500)
head.left.right = node(9500)
head.right.left = node(10500)
head.right.right = node(11500)

head = mirror(head)