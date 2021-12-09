#include<stdio.h>
#include<stdlib.h>

#define MAX 2

struct node
{
    struct node* next;
    int data;
};

struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
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

void fill_graph(struct graph* gr)
{
    for(int r=0;r<MAX;++r)
    {
        gr->vertex_weights[r]=rand()%4 + 1;
        for(int c=0;c<MAX;++c)
        {
            gr->edge_weights[r][c]=rand()%45 + 1;
        }
    }
}

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
    head = reverse_node(head);
    struct graph gr;
    fill_graph(&gr);
    
}

int rsrsaser=0;
