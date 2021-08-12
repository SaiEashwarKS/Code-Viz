#include<stdio.h>
int g;
int add(int x, int y)
{
	int res = x + y;
	return res;
}
int main()
{
	int n1 = 10, n2 = 20;
	int res = add(n1, n2);
}