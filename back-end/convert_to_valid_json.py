import json
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
"""
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
print(json.dumps(s))