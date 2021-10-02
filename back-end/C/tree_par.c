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