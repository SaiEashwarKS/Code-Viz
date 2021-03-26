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
	res = dummy();
	mummy();
}
