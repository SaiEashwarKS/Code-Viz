#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int g;

typedef struct example
{
	int a;
	char b[100];
}example;

int main()
{	
	example c;
	c.a=10;
	strcpy(c.b,"abcde");
	int *p,*l;
	int k=5;
	p=&k;
	l=&k;
	int x = g + 1;
	p=&x;
	int z = k+5;
	return 0;
}