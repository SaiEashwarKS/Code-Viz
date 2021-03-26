#include<stdio.h>
int g;
int dummy()
{
	int i = 10;
	return i;
}

int mummy()
{
	int d=50;
	return d;
}

int main()
{
	int res;
	int x;
	res = dummy();
	//mummy();
	res = 10;
	x=20;
	res = x;
}

