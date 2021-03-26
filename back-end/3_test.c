#include<stdio.h>
#include<stdlib.h>

int g;

int main()
{
	int x = 10;
	int y = 20;
	int b=20;
	int *z=&x;
	z=&y;
	int **a=&z;
	z=&b;
}
