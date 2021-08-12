#include <stdio.h>
#include <stdlib.h>

int g;

int main()
{
	int a = 10;
	int *p = (int*)malloc(sizeof(int));
	*p = a;
}
