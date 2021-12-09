
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
        struct node* temp = head->next;
        printf("%d\n",head->data);
	head = temp;
    }
}

int rsrsaser=0;
