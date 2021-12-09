import json
import re
"""
s = '''
#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    struct node* left;
    int data;
    struct node* right;
    struct node* parent;
};

struct node* createnode(int data)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->left=NULL;
    temp->right=NULL;
    temp->parent=NULL;
    temp->data=data;
    return temp;
}


int main()
{
    struct node* head=createnode(50);
    head->left=createnode(25);
    head->left->parent=head;
    head->right=createnode(75);
    head->right->parent=head;
    head->left->left=createnode(10);
    head->left->left->parent=head->left;
    head->left->right=createnode(40);
    head->left->right->parent=head->left;
}
'''

s = '''#include<stdio.h>
#include<stdlib.h>
struct node
{
    struct node* left;
    int data;
    struct node* right;
};

struct node* tree_mirroring(struct node* root)
{
    if (root)
    {
        struct node* lr = tree_mirroring(root->left);
        struct node* rr = tree_mirroring(root->right);
        root->left = rr;
        root->right = lr;
    }
    return root;
}

struct node* createnode(int data)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->left=NULL;
    temp->right=NULL;
    temp->data=data;
    return temp;
}


int main()
{
    struct node* head=createnode(10000);
    head->left=createnode(9000);
    head->right=createnode(11000);
    head->left->left=createnode(8500);
    head->left->right=createnode(9500);
    head->right->left=createnode(10500);
    head->right->right=createnode(11500);  
    head = tree_mirroring(head); 
}

'''
s = '''#include<stdio.h>
#include<stdlib.h>

#define MAX 6

struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
};

/*

  1---4
 / \ /|
0   3 |
 \ / \|
  2---5

*/

void fill_graph(struct graph* gr)
{
    for(int r=0;r<MAX;++r)
    {
        gr->vertex_weights[r]=r*r;
        for(int c=0;c<MAX;++c)
        {
            gr->edge_weights[r][c] = -1;
        }
    }
    gr->edge_weights[0][1] = 1;
    gr->edge_weights[0][2] = 1;
    gr->edge_weights[1][3] = 1;
    gr->edge_weights[1][4] = 1;
    gr->edge_weights[2][3] = 1;
    gr->edge_weights[2][5] = 1;
    gr->edge_weights[3][4] = 1;
    gr->edge_weights[3][5] = 1;
    gr->edge_weights[4][5] = 1;
}

void fill_visited(int visited[])
{
    for(int vertex=0;vertex<MAX;++vertex)
    {
        visited[vertex] = 0;
    }
}

int check_incoming_edges(int currentvertex,struct graph* gr)
{
    int number_of_incoming_edges = 0;
    for (int c=0;c<MAX;++c)
    {
        if (gr->edge_weights[c][currentvertex]>0)
            ++number_of_incoming_edges;
    }
    return number_of_incoming_edges;
}

void remove_to_edges(int to_be_explored,struct graph* gr)
{
    for(int other_vertex=0;other_vertex<MAX;++other_vertex)
    {
        gr->edge_weights[to_be_explored][other_vertex] = -1;
    }

}

int main()
{
    int k=0;
    struct graph gr;
    fill_graph(&gr);
    int visited[MAX];
    int number_of_incoming_edges;
    fill_visited(visited);

    for (int numberoftimes=0;numberoftimes<MAX;++numberoftimes)
    {
        int to_be_explored = -1;
        for(int currentvertex=0;currentvertex<MAX;++currentvertex)
        {
            if (visited[currentvertex]==0)
            {
                number_of_incoming_edges = check_incoming_edges(currentvertex,&gr);               
                if (number_of_incoming_edges==0)
                {
                    to_be_explored = currentvertex;
                    break;
                }
            }
        }
        visited[to_be_explored] = 1;
        remove_to_edges(to_be_explored,&gr);
    }
}
'''
s = '''#include<stdio.h>
#include<stdlib.h>

#define MAX 6

struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
};

/*

  1---4
 / \ /|
0   3 |
 \ / \|
  2---5

*/

void fill_graph(struct graph* gr)
{
    for(int r=0;r<MAX;++r)
    {
        gr->vertex_weights[r]=r;
        for(int c=0;c<MAX;++c)
        {
            gr->edge_weights[r][c] = -1;
        }
    }
    gr->edge_weights[0][1] = 1;
    gr->edge_weights[0][2] = 1;
    gr->edge_weights[1][3] = 1;
    gr->edge_weights[1][4] = 1;
    gr->edge_weights[2][3] = 1;
    gr->edge_weights[2][5] = 1;
    gr->edge_weights[3][4] = 1;
    gr->edge_weights[3][5] = 1;
    gr->edge_weights[4][5] = 1;
}

void fill_visited(int visited[])
{
    for(int vertex=0;vertex<MAX;++vertex)
    {
        visited[vertex] = 0;
    }
}

int check_incoming_edges(int currentvertex,struct graph* gr)
{
    int number_of_incoming_edges = 0;
    for (int c=0;c<MAX;++c)
    {
        if (gr->edge_weights[c][currentvertex]>0)
            ++number_of_incoming_edges;
    }
    return number_of_incoming_edges;
}

void remove_to_edges(int to_be_explored,struct graph* gr)
{
    for(int other_vertex=0;other_vertex<MAX;++other_vertex)
    {
        gr->edge_weights[to_be_explored][other_vertex] = -1;
    }

}

int find_next(struct graph* gr, int visited[])
{
    int to_be_explored = -1;
    int number_of_incoming_edges;
    for(int currentvertex=0;currentvertex<MAX;++currentvertex)
    {
        if (visited[currentvertex]==0)
        {
            number_of_incoming_edges = check_incoming_edges(currentvertex,gr);               
            if (number_of_incoming_edges==0)
            {
                to_be_explored = currentvertex;
                break;
            }
        }
    }
    return to_be_explored;
}

int main()
{
    int k=0;
    struct graph gr;
    fill_graph(&gr);
    int visited[MAX];
    int to_be_explored;
    fill_visited(visited);

    for (int numberoftimes=0;numberoftimes<MAX;++numberoftimes)
    {
        to_be_explored = find_next(&gr,visited);
        printf("%d %d\n",to_be_explored,to_be_explored+1);
        visited[to_be_explored] = 1;
        remove_to_edges(to_be_explored,&gr);
    }
}
'''
"""

s = '''
#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    struct node* left;
    int data;
    struct node* right;
    struct node* parent;
};

struct node* createnode(int data)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->left=NULL;
    temp->right=NULL;
    temp->parent=NULL;
    temp->data=data;
    printf("%d\n",data);
    return temp;
}


int main()
{
    struct node* head=createnode(50);
    head->left=createnode(25);
    head->left->parent=head;
    head->right=createnode(75);
    head->right->parent=head;
    head->left->left=createnode(10);
    head->left->left->parent=head->left;
    head->left->right=createnode(40);
    head->left->right->parent=head->left;
}
'''
'''
li = list(re.finditer(r"printf[.\n\(\)a-z\"0-9A-Z\% +_,]*;",s))
#print(li)
for i in li:
    s = s[:i.start()] + s[i.start():i.end()].replace("\n","\\n").replace("\t","\\t") + s[i.end():]
print(s)
'''
s = '''#include<stdio.h>
int g=0;
int main()
{
    for(int i=0;i<5;++i)
        printf("HELLO\t%d\n",i);
}'''
"""
s = '''#include<stdio.h>
#include<stdlib.h>

#define MAX 6

struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
};

/*

  1---4
 / \ /|
0   3 |
 \ / \|
  2---5

*/

void fill_graph(struct graph* gr)
{
    for(int r=0;r<MAX;++r)
    {
        gr->vertex_weights[r]=r*r;
        for(int c=0;c<MAX;++c)
        {
            gr->edge_weights[r][c] = -1;
        }
    }
    gr->edge_weights[0][1] = 1;
    gr->edge_weights[0][2] = 1;
    gr->edge_weights[1][3] = 1;
    gr->edge_weights[1][4] = 1;
    gr->edge_weights[2][3] = 1;
    gr->edge_weights[2][5] = 1;
    gr->edge_weights[3][4] = 1;
    gr->edge_weights[3][5] = 1;
    gr->edge_weights[4][5] = 1;
}

void fill_visited(int visited[])
{
    for(int vertex=0;vertex<MAX;++vertex)
    {
        visited[vertex] = 0;
    }
}

int check_incoming_edges(int currentvertex,struct graph* gr)
{
    int number_of_incoming_edges = 0;
    for (int c=0;c<MAX;++c)
    {
        if (gr->edge_weights[c][currentvertex]>0)
            ++number_of_incoming_edges;
    }
    return number_of_incoming_edges;
}

void remove_to_edges(int to_be_explored,struct graph* gr)
{
    for(int other_vertex=0;other_vertex<MAX;++other_vertex)
    {
        gr->edge_weights[to_be_explored][other_vertex] = -1;
    }

}

int find_next(struct graph* gr, int visited[])
{
    int to_be_explored = -1;
    int number_of_incoming_edges;
    for(int currentvertex=0;currentvertex<MAX;++currentvertex)
    {
        if (visited[currentvertex]==0)
        {
            number_of_incoming_edges = check_incoming_edges(currentvertex,gr);               
            if (number_of_incoming_edges==0)
            {
                to_be_explored = currentvertex;
                break;
            }
        }
    }
    return to_be_explored;
}

int main()
{
    int k=0;
    struct graph gr;
    fill_graph(&gr);
    int visited[MAX];
    int to_be_explored;
    fill_visited(visited);

    for (int numberoftimes=0;numberoftimes<MAX;++numberoftimes)
    {
        to_be_explored = find_next(&gr,visited);
        visited[to_be_explored] = 1;
        printf("Explored : %d\n",to_be_explored);
        remove_to_edges(to_be_explored,&gr);
    }
}
'''

s = '''// C program to insert a node in AVL tree
#include<stdio.h>
#include<stdlib.h>
 
// An AVL tree node
struct Node
{
    int key;
    struct Node *left;
    struct Node *right;
    int height;
};
 
// A utility function to get maximum of two integers
int max(int a, int b);
 
// A utility function to get the height of the tree
int height(struct Node *N)
{
    if (N == NULL)
        return 0;
    return N->height;
}
 
// A utility function to get maximum of two integers
int max(int a, int b)
{
    return (a > b)? a : b;
}
 
/* Helper function that allocates a new node with the given key and
    NULL left and right pointers. */
struct Node* newNode(int key)
{
    struct Node* node = (struct Node*)
                        malloc(sizeof(struct Node));
    node->key   = key;
    node->left   = NULL;
    node->right  = NULL;
    node->height = 1;  // new node is initially added at leaf
    return(node);
}
 
// A utility function to right rotate subtree rooted with y
// See the diagram given above.
struct Node *rightRotate(struct Node *y)
{
    struct Node *x = y->left;
    struct Node *T2 = x->right;
 
    // Perform rotation
    x->right = y;
    y->left = T2;
 
    // Update heights
    y->height = max(height(y->left), height(y->right))+1;
    x->height = max(height(x->left), height(x->right))+1;
 
    // Return new root
    return x;
}
 
// A utility function to left rotate subtree rooted with x
// See the diagram given above.
struct Node* leftRotate(struct Node *x)
{
    struct Node *y = x->right;
    struct Node *T2 = y->left;
 
    // Perform rotation
    y->left = x;
    x->right = T2;
 
    //  Update heights
    x->height = max(height(x->left), height(x->right))+1;
    y->height = max(height(y->left), height(y->right))+1;
 
    // Return new root
    return y;
}
 
// Get Balance factor of node N
int getBalance(struct Node *N)
{
    if (N == NULL)
        return 0;
    return height(N->left) - height(N->right);
}
 
// Recursive function to insert a key in the subtree rooted
// with node and returns the new root of the subtree.
struct Node* insert(struct Node* node, int key)
{
    /* 1.  Perform the normal BST insertion */
    if (node == NULL)
        return(newNode(key));
 
    if (key < node->key)
        node->left  = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else // Equal keys are not allowed in BST
        return node;
 
    /* 2. Update height of this ancestor node */
    node->height = 1 + max(height(node->left),
                           height(node->right));
 
    /* 3. Get the balance factor of this ancestor
          node to check whether this node became
          unbalanced */
    int balance = getBalance(node);
 
    // If this node becomes unbalanced, then
    // there are 4 cases
 
    // Left Left Case
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);
 
    // Right Right Case
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);
 
    // Left Right Case
    if (balance > 1 && key > node->left->key)
    {
        node->left =  leftRotate(node->left);
        return rightRotate(node);
    }
 
    // Right Left Case
    if (balance < -1 && key < node->right->key)
    {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
 
    /* return the (unchanged) node pointer */
    return node;
}
 
/* Driver program to test above function*/
int main()
{
    struct Node* root = NULL;
 
  /* Constructing tree given in the above figure */
  root = insert(root, 10);
  printf("%d\n",root->key);
  root = insert(root, 20);
  printf("%d\n",root->key);
  root = insert(root, 30);
  printf("%d\n",root->key);
  root = insert(root, 40);
  printf("%d\n",root->key);
  root = insert(root, 50);
  printf("%d\n",root->key);
  root = insert(root, 25);
  printf("%d\n",root->key); 
  /* 
  The constructed AVL Tree would be
            30
           /           20   40
        /  \            10  25    50
  */
 }
'''
"""
"""
s = '''#include<stdio.h>
#include<stdlib.h>
int g=0;
struct node
{
    struct node* left;
    int data;
    struct node* right;
};

struct node* createnode(int data)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->left=NULL;
    temp->data=data;
    temp->right=NULL;
    return temp;
}

void inorder(struct node* root)
{
    if (root)
    {
        inorder(root->left);
        printf("VISITED NODE%d\n",root->data);
        inorder(root->right);
    }
}


int main()
{
    struct node* head=createnode(10000);
    head->left=createnode(9000);
    head->right=createnode(11000);
    head->left->left=createnode(8500);
    head->left->right=createnode(9500);
    head->right->left=createnode(10500);
    head->right->right=createnode(11500);
    inorder(head);  
}

'''
"""
"""
s = '''#include<stdio.h>
#include<stdlib.h>

#define MAX 2

struct node
{
    struct node* next;
    int data;
};

struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
};

struct node* reverse_node(struct node* root)
{
    struct node* prev = NULL;
    while(root)
    {
        struct node* temp = root->next;
        root->next = prev;
        prev = root;
        root = temp;
    }
    return prev;
}

void fill_graph(struct graph* gr)
{
    for(int r=0;r<MAX;++r)
    {
        gr->vertex_weights[r]=rand()%4 + 1;
        for(int c=0;c<MAX;++c)
        {
            gr->edge_weights[r][c]=rand()%45 + 1;
        }
    }
}

int main()
{
    int k = 0;
    struct node* head = malloc(sizeof(struct node));
    head->data = 45;
    head->next = malloc(sizeof(struct node));
    head->next->data = 50;
    head->next->next = malloc(sizeof(struct node));
    head->next->next->data = 55;
    head->next->next->next = malloc(sizeof(struct node));
    head->next->next->next->data = 60;
    head = reverse_node(head);
    struct graph gr;
    fill_graph(&gr);
    
}
'''
"""
"""
s = '''
#include<stdio.h>
#include<stdlib.h>

#define MAX 2

struct node
{
    struct node* next;
    int data;
};

int main()
{
    int k = 0;
    struct node* head = malloc(sizeof(struct node));
    head->data = 45;
    head->next = malloc(sizeof(struct node));
    head->next->data = 50;
    head->next->next = malloc(sizeof(struct node));
    head->next->next->data = 55;
    head->next->next->next = malloc(sizeof(struct node));
    head->next->next->next->data = 60;
    while(head)
    {
        struct node* temp = head;
        printf("%d\n",head->data);
    }
}
'''
"""
s = '''
class node:
    def __init__(self,val=0):
      self.left = None
      self.val = val
      self.right = None
      
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
'''
print(json.dumps(s))
