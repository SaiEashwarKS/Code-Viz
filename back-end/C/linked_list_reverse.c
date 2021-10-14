#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    struct node* next;
    int data;
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

int main()
{
    struct node* head = malloc(sizeof(struct node));
    head->data = 45;
    head->next = malloc(sizeof(struct node));
    head->next->data = 50;
    head->next->next = malloc(sizeof(struct node));
    head->next->next->data = 55;
    head->next->next->next = malloc(sizeof(struct node));
    head->next->next->next->data = 60;
    head = reverse_node(head);
}