#include<stdio.h>
#include<stdlib.h>

struct node
{
    int val;
    struct node* next;
};

typedef struct node node;

void insertatend(node* head,int val)
{
    node* parent=NULL;
    while(head)
    {
        parent=head;
        head=head->next;
    }
    parent->next=malloc(sizeof(node));
    parent->next->next=NULL;
    parent->next->val=val;
}

void deleteatend(node* head)
{
    node* parent=NULL;
    while(head)
    {
        parent=head;
        head=head->next;
    }
    free(parent->next);
    parent->next=NULL;
}

int main()
{
    node* head=malloc(sizeof(node));
    head->val=5;
    head->next=malloc(sizeof(node));
    head->next->val=6;
    head->next->next=NULL;
    insertatend(head,7);
    deleteatend(head);
    return 0;
}