#include <stdio.h>
#include <stdlib.h>
  
int g;

struct Node {
    int data;
    struct Node* next;
};


int main()
{
    struct Node head;
    struct Node second;
    struct Node third;
  
    head.data = 1;
    head.next = &second;
	
    second.data = 2;
    second.next = &third;
	 
    third.data = 3;
    third.next = NULL;
	
    return 0;
}
