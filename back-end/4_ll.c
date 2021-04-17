#include <stdio.h>
#include <stdlib.h>
  
int g;

struct Node {
    int data;
    struct Node* next;
};


int main()
{
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 11;
    head->next = (struct Node*)malloc(sizeof(struct Node));
	
    head->next->data = 21;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
	 
    head->next->next->data = 31;
    head->next->next->next = NULL;
	
    return 0;
}
