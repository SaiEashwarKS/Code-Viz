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
  
    head.data = 1; // assign data in first node
    head.next = &second; // Link first node with
	
    second.data = 2;
    second.next = &third;
	 
    third.data = 3; // assign data to third node
    third.next = NULL;
	
    return 0;
}
