#include<stdio.h>
#include<stdlib.h>
int g;
int chk(int z,int* p)
{
	int w=2;
	p=&w;
	return z+1;
}

int foo(int a,int* p,int* d)
{
	a = 10;
	int z=4;
	*p = (*p) + 1;
	p=&a;
	z=z+1;
	d=&z;
	int c=10;
	a=chk(a,p);
	a=a*2;
	return a;
}

int main()
{	
	int *p,*l;
	int k=5;
	p=&k;
	l=&k;
	int x = g + 1;
	p=&x;
	int ret = foo(x,p,l);
	int z = k+5;
	return 0;
}
