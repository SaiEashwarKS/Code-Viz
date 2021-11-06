#include <stdio.h>
#include <stdlib.h>
  
int g;

struct Node {
  struct Node* prev;
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
    head->prev = NULL;
    
    second->data = 21;
    second->next = third;
    second->prev = head;
     
    third->data = 31;
    third->next = NULL;
    third->prev = second;
    
    return 0;
}