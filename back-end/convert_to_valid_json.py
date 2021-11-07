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
print(json.dumps(s))
