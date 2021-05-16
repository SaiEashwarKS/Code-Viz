#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    int value;
    struct node* next;
};

struct node* insertorder(struct node* ptr,int value)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->value=value;
    temp->next=NULL;
    if (value<ptr->value)
    {
        temp->next=ptr;
        return temp;
    }
    struct node* tempi=ptr;
    struct node* parent=NULL;
    while(ptr && ptr->value<value)
    {
        parent=ptr;
        ptr=ptr->next;
    }
    temp->next = parent->next;
    parent->next=temp;
    return tempi;
}

int main()
{
    int a=5;
    struct node* head = malloc(sizeof(struct node));
    head->value=10;
    head->next=NULL;
    struct node* nhead = malloc(sizeof(struct node));
    nhead->value=12;
    nhead->next=NULL;
    head->next=nhead;
    head=insertorder(head,11);
}