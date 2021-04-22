#include <stdio.h>
#include <stdlib.h>
int g;
extern void* resrsasr[1000];
extern int resrsasr_i;

struct node
{
	int a;
	struct node *n;
};


int main()
{
	struct node* a = (struct node*)malloc(sizeof(struct node));
	struct node* b = (struct node*)malloc(sizeof(struct node));
	//for(int i = 0; i < resrsasr_i; ++i)
	//	printf("%p \n", resrsasr[i]);
	a->n = b;
	free(b);
	a->n = NULL;
	a->a = 123;
	//for(int i = 0; i < resrsasr_i; ++i)
	//	printf("%p \n", resrsasr[i]);
}
