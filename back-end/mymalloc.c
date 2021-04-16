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
