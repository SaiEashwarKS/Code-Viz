#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    struct node* left;
    struct node* right;
    int data;
};

struct node* createnode(int data)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->left=NULL;
    temp->right=NULL;
    temp->data=data;
    return temp;
}

void inorder(struct node* root)
{
    if (root)
    {
        inorder(root->left);
        printf("%d ",root->data);
        inorder(root->right);
    }
}

int main()
{
    struct node* head=createnode(50);
    head->left=createnode(25);
    head->right=createnode(75);
    head->left->left=createnode(10);
    head->left->right=createnode(40);
    inorder(head);
    printf("\n");
}