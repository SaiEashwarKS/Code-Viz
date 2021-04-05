#include<stdio.h>
int g;
int dummy()
{
	int i = 10;
	return i;
}

int main()
{
	int res = 10;
	res = dummy();
	
	int y = 100;
	y = 200;

}
