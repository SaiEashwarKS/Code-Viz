#GIVEN an element which is a graph, we process based on that, we call it element
import json

'''
subgraph cluster_0 {
		style=filled;
		color=lightgrey;
		node [style=filled,color=white];
		a0 -> a1 -> a2 -> a3;
		label = "process #1";
	}
'''

def make_graph(element):
	s="subgraph cluster_0{\n"
	print(element["val"])
	vertex_weights = (element["val"][0]["vertex_weights"])
	edge_weights = (element["val"][0]["edge_weights"])
	n = len(edge_weights)
	for i in range(n):
		s += '"'+str(i)+":"+str(vertex_weights[i])+'";\n'
	for i in range(n):
		for j in range(n):
			if edge_weights[i][j]>0:
				s += '"'+str(i)+":"+str(vertex_weights[i])+'"->"'+str(j)+":"+str(vertex_weights[j])+'"[label='+str(edge_weights[i][j])+'];\n'
	s+="}\n"
	print(s)
	return

element = '''{
          "data_type": "struct graph", 
          "type": "var", 
          "id": 5, 
          "val": [
            {
              "edge_weights": [
                [
                  4200992, 
                  0
                ], 
                [
                  4201152, 
                  0
                ]
              ], 
              "vertex_weights": [
                0, 
                0
              ]
            }
          ], 
          "name": "gr"
        }'''
element = json.loads(element)



data_type_to_DS_map = {}

data_type_to_DS_map[element["data_type"]] = "graph"

if element["data_type"] in data_type_to_DS_map and data_type_to_DS_map[element["data_type"]]=="graph":
    make_graph(element)