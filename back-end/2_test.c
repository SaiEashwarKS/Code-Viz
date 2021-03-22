#include <stdio.h>

int g;

int foo(int x)
{
	int y = x*2;
	return y;
}

int main()
{
	int x = 10;
	x = foo(x);
	return 0;
}
