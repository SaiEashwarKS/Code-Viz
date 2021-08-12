#include<stdio.h>
#include<stdlib.h>

int g;

typedef struct example2
{
	int a;
	int b;
}example2;

typedef struct example1
{
	int a;
	struct example2 b;
}example1;

int main()
{
	int x = 10;
	int y = 20;
	struct example1 s1;
	s1.a = 100;
	s1.b.a = 110;
	s1.b.b = 220;
}
