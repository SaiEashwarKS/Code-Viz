#include<stdio.h>
#include<stdlib.h>
int g=0;
struct node
{
    int k;
};

int main()
{
    int* p = (int *)
            malloc(sizeof(int));
    struct node d;
    d.k = 5;   
}