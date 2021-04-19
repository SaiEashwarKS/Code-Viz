#include<stdio.h>
#include<stdlib.h>

int g;

struct node
{
    int val;
    struct node* next;
};


void insertatend(struct node* head,int val)
{
    struct node* parent=NULL;
    while(head)
    {
        parent=head;
        head=head->next;
    }
    parent->next=malloc(sizeof(struct node));
    parent->next->next=NULL;
    parent->next->val=val;
}

void deleteatend(struct node* head)
{
    struct node* parent=NULL;
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
    struct node* head=malloc(sizeof(struct node));
    head->val=5;
    head->next=malloc(sizeof(struct node));
    head->next->val=6;
    head->next->next=NULL;
    insertatend(head,7);
    deleteatend(head);
    return 0;
}
