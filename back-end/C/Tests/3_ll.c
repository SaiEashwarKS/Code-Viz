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
    struct Node* second = (struct Node*)malloc(sizeof(struct Node));
    struct Node* third = (struct Node*)malloc(sizeof(struct Node));
	  	
    head->data = 11;
    head->next = second;
	
    second->data = 21;
    second->next = third;
	 
    third->data = 31;
    third->next = NULL;
	
    return 0;
}
