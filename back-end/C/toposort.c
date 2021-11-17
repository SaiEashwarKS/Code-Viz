#include<stdio.h>
#include<stdlib.h>

#define MAX 6

struct graph
{
    int edge_weights[MAX][MAX];
    int vertex_weights[MAX];
};

/*

  1---4
 / \ /|
0   3 |
 \ / \|
  2---5

*/

void fill_graph(struct graph* gr)
{
    for(int r=0;r<MAX;++r)
    {
        gr->vertex_weights[r]=r*r;
        for(int c=0;c<MAX;++c)
        {
            gr->edge_weights[r][c] = -1;
        }
    }
    gr->edge_weights[0][1] = 1;
    gr->edge_weights[0][2] = 1;
    gr->edge_weights[1][3] = 1;
    gr->edge_weights[1][4] = 1;
    gr->edge_weights[2][3] = 1;
    gr->edge_weights[2][5] = 1;
    gr->edge_weights[3][4] = 1;
    gr->edge_weights[3][5] = 1;
    gr->edge_weights[4][5] = 1;
}

void fill_visited(int visited[])
{
    for(int vertex=0;vertex<MAX;++vertex)
    {
        visited[vertex] = 0;
    }
}

int check_incoming_edges(int currentvertex,struct graph* gr)
{
    int number_of_incoming_edges = 0;
    for (int c=0;c<MAX;++c)
    {
        if (gr->edge_weights[c][currentvertex]>0)
            ++number_of_incoming_edges;
    }
    return number_of_incoming_edges;
}

void remove_to_edges(int to_be_explored,struct graph* gr)
{
    for(int other_vertex=0;other_vertex<MAX;++other_vertex)
    {
        gr->edge_weights[to_be_explored][other_vertex] = -1;
    }

}

int find_next(struct graph* gr, int visited[])
{
    int to_be_explored = -1;
    int number_of_incoming_edges;
    for(int currentvertex=0;currentvertex<MAX;++currentvertex)
    {
        if (visited[currentvertex]==0)
        {
            number_of_incoming_edges = check_incoming_edges(currentvertex,gr);               
            if (number_of_incoming_edges==0)
            {
                to_be_explored = currentvertex;
                break;
            }
        }
    }
    return to_be_explored;
}

int main()
{
    int k=0;
    struct graph gr;
    fill_graph(&gr);
    int visited[MAX];
    int to_be_explored;
    fill_visited(visited);

    for (int numberoftimes=0;numberoftimes<MAX;++numberoftimes)
    {
        to_be_explored = find_next(&gr,visited);
        visited[to_be_explored] = 1;
        printf("Explored : %d\n",to_be_explored);
        remove_to_edges(to_be_explored,&gr);
    }
}
