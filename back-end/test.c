#include <stdio.h>
#include <stdlib.h>
int g;

int main()
{
	int *p;
	p = (int *)malloc(sizeof(int));
	*p = 100;
	int a = 10;
}
