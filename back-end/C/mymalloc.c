#include <stdlib.h>
void* resrsasr[1000];
int resrsasr_i = 0;

void* mymalloc(size_t size)
{
	void* ptr = malloc(size);
	resrsasr[resrsasr_i] = ptr;
	++resrsasr_i;
	return ptr;
}

void myfree(void *ptr)
{
	int i = 0;
	while(i < resrsasr_i && resrsasr[i] != ptr)
	{
		++i;
	}
	if(i < resrsasr_i)
	{
		for(int j = i; j < resrsasr_i - 1; ++j)
		{
			resrsasr[j] = resrsasr[j + 1];
		}
		--resrsasr_i;
	}
	free(ptr);
}
