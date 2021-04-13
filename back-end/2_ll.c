#include <stdio.h>
#include <stdlib.h>
  
int g;

struct Node {
    int data1;
    int data2;
    struct Node* next;
};


int main()
{
    struct Node head;
    struct Node second;
    struct Node third;
  
    head.data1 = 11;
    head.data2 = 12;
    head.next = &second;
	
    second.data1 = 21;
    second.data2 = 22;
    second.next = &third;
	 
    third.data1 = 31;
    third.data2 = 32;
    third.next = NULL;
	
    return 0;
}
