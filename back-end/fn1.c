#include<stdio.h>
int g;
int dummy()
{
	int i = 10;
	return i;
}

int main()
{
	int res;
	res = dummy();
}
