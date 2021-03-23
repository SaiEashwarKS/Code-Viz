#include <stdio.h>
int g;
int main()
{
    int n1, n2, i, gcd;
	n1 = 5;
	n2 = 10;

    for(i=1; i <= n1 && i <= n2; ++i)
    {
        // Checks if i is factor of both integers
        if(n1%i==0 && n2%i==0)
            gcd = i;
    }

    return 0;
}
