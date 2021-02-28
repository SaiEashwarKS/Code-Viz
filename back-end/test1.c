#include<stdio.h>
#include<stdlib.h>

int g;

typedef struct example2
{
	int a;
	int b[5];
}example2;

typedef struct example1
{
	int a;
	struct example2 b;
}example1;

int main()
{
	struct example1 e1;
	e1.a = 1;
	e1.b.a = 2;
	e1.b.b[0] = 100;
	e1.b.b[1] = 200;
	e1.b.b[2] = 300;
	int x = 10;
	int y = 20;
	int *z=&x;
}
