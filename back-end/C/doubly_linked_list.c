#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    struct node* next;
    struct node* prev;
    int data;
};

struct node* createnode(int data)
{
    struct node* temp = malloc(sizeof(struct node));
    temp->next = NULL;
    temp->prev = NULL;
    temp->data = data;
}

struct node* insert_inorder(struct node* root, int data)
{
    struct node* parent = NULL;
    struct node* rootc = root;
    struct node* temp = createnode(data);
    while(root && root->data<data)
    {
        parent = root;
        root = root->next;
    }    
    if (parent)
    {
        parent->next = temp;
        temp->next = root;
        temp->prev = parent;
    }
    else
    {
        rootc->prev = temp;
        temp->next = rootc;
        rootc = temp;
    }
    return rootc;
}

int main()
{
    struct node* head = createnode(45);
    head = insert_inorder(head,50);
    head = insert_inorder(head,60);
    head = insert_inorder(head,55);
}