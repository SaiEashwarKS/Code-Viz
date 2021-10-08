#include<stdio.h>
#include<stdlib.h>
int g=0;
#define MAX 2

typedef struct graph
{
    int g[MAX][MAX];
}graph;

int main()
{
    struct graph gr;
    for(int r=0;r<MAX;++r)
    {
        for(int c=0;c<MAX;++c)
        {
            gr.g[r][c]=rand();
        }
    }
}