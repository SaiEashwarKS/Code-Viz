#include<stdio.h>
#include<stdlib.h>

int g;

typedef struct example2
{
	int a;
	int b;
}example1;

int main()
{
	int x = 10;
	int y = 20;
	int *z=&x;
	z=&y;
	example1 s1;
	s1.a = 10;
	s1.b = 20;
}
