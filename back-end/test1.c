#include<stdio.h>
#include<stdlib.h>

int g;

int gcd(int a,int b)
{
	if (a==0)
		return b;
	if (a>b)
		return gcd(b,a);
	return gcd(b%a,a);

}

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
	int b=20;
	int* p=malloc(sizeof(int));
	p=&x;
	int d[]={1,2,3,4,5,6};
	example1 ex1;
	ex1.a=5;
	ex1.b.a=10;
	ex1.b.b=45;
}
