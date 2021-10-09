#include<stdio.h>
#include<stdlib.h>
int g=0;
#define MAX 2

typedef struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
}graph;

int main()
{
    int k=0;
    struct graph gr;
    for(int r=0;r<MAX;++r)
    {
        gr.vertex_weights[r]=rand()%4 + 1;
        for(int c=0;c<MAX;++c)
        {
            gr.edge_weights[r][c]=rand()%45 + 1;
        }
    }
}