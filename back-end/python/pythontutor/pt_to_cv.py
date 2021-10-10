import json

global_ids = dict()
classes = set()
id_counter = 1000


'''
CURRENT FORMAT

"GlobalVariables": [
        {
          "type": "ptr",
          "val": 1,
          "name": "A"
        },
        {
          "type": "ptr",
          "val": 3,
          "name": "a"
        },
        {
          "type": "ptr",
          "val": 4,
          "name": "b"
        }
      ]
'''
def handle_global_var(variables:list, classes:list):
	global id_counter
	cviz_gvar = []
	for var in variables:
		if var['name'] not in classes:
			if var['name'] in global_ids:
				ID = global_ids[var['name']]
			else:
				ID = id_counter
				global_ids[var['name']] = ID
				id_counter += 1
			new = dict(type=var['type'], id=str(ID), val=var['val'], name=var['name'])
			if 'data_type' in var:
				new['data_type'] = var['data_type']
			cviz_gvar.append(new)
	return cviz_gvar
	

def handle_stack_frame():
    pass


'''
CURRENT FORMAT

"Heap": 
[
    {
      "data_type": "INSTANCE",
      "id": 3,
      "val": [
        "A",
        [
          {
            "type": "var",
            "data_type": "str",
            "val": "x"
          },
          {
            "type": "var",
            "data_type": "int",
            "val": 10
          }
        ],
        [
          {
            "type": "var",
            "data_type": "str",
            "val": "y"
          },
          {
            "type": "var",
            "data_type": "int",
            "val": 20
          }
        ]
      ]
    },
    {
      "data_type": "CLASS",
      "id": 1,
      "val": [
        "A",
        [],
        [
          {
            "type": "var",
            "data_type": "str",
            "val": "__init__"
          },
          {
            "type": "ptr",
            "val": 2
          }
        ]
      ]
    },
    {
      "data_type": "FUNCTION",
      "id": 2,
      "val": [
        "__init__(self)",
        null
      ]
    }
]
'''
def handle_heap_var(variables:list):
	cviz_hvar = []
	for var in variables:
		if var['data_type'] == 'CLASS':
			classes.add(var['data_type'])
		elif var['data_type'] == 'INSTANCE':
			new = dict(id=var['id'], data_type=var['val'][0])
			new['val'] = []
			for i in var['val'][1:]:
				temp={i[0]['val']:i[1]['val']}
				new['val'].append(temp)
			cviz_hvar.append(new)
	return cviz_hvar
			

def format_trace(trace:list):
	new_trace = []
	global classes
	
	for entry in trace:
		lineno = entry['LineNum']
		stackdepth = entry['stackdepth']
		
		# StackFrame
		# cviz_stack_frame = dict(LineNum=lineno, type='StackFrame', Contents=handle_stack_frame(trace['StackFrame']))
		# not complete
		Contents=[]
		cviz_stack_frame = dict(LineNum=lineno, type='StackFrame', Contents=Contents)
		
		# Heap
		Contents = handle_heap_var(entry['Heap'])
		cviz_heap = dict(LineNum=lineno, type='Heap', Contents=Contents)
		
		# Global
		Contents = handle_global_var(entry['GlobalVariables'], classes)
		cviz_gvar = dict(LineNum=lineno, type='GlobalVariables', Contents=Contents)
		
		# Function
		# not complete
		cviz_function = dict(LineNum=lineno, stackdepth=stackdepth, type='Function')
		
		new_trace.extend([cviz_gvar, cviz_function, cviz_heap, cviz_stack_frame])
		
	return new_trace
	

if __name__ == '__main__':
	f = open('trace.json','r')
	tr = f.read()
	tr = json.loads(tr)['trace']
	new_tr = format_trace(tr)
	print(json.dumps(new_tr,indent=2))
	
	
	s = '''[{
		  "type": "ptr",
		  "val": 1,
		  "name": "A"
		},
		{
		  "type": "ptr",
		  "val": 3,
		  "name": "a"
		},
		{
		  "type": "ptr",
		  "val": 4,
		  "name": "b"
		}
	  ]'''
	#gtrace = json.loads(s)
	#print(json.dumps(gtrace, indent=2))
	#print('---------cviz---------')
	#print(json.dumps(handle_global_var(gtrace, ['A']), indent=2))
	
	#print('\n=======================\n')
	
	
	s = '''
	[
		{
		  "data_type": "INSTANCE",
		  "id": 3,
		  "val": [
		    "A",
		    [
		      {
		        "type": "var",
		        "data_type": "str",
		        "val": "x"
		      },
		      {
		        "type": "var",
		        "data_type": "int",
		        "val": 10
		      }
		    ],
		    [
		      {
		        "type": "var",
		        "data_type": "str",
		        "val": "y"
		      },
		      {
		        "type": "var",
		        "data_type": "int",
		        "val": 20
		      }
		    ]
		  ]
		},
		{
		  "data_type": "CLASS",
		  "id": 1,
		  "val": [
		    "A",
		    [],
		    [
		      {
		        "type": "var",
		        "data_type": "str",
		        "val": "__init__"
		      },
		      {
		        "type": "ptr",
		        "val": 2
		      }
		    ]
		  ]
		},
		{
		  "data_type": "FUNCTION",
		  "id": 2,
		  "val": [
		    "__init__(self)",
		    null
		  ]
		}
	]
	'''
		
	
	#htrace = json.loads(s)
	#print(json.dumps(htrace, indent=2))
	#print('---------cviz---------')
	#print(json.dumps(handle_heap_var(htrace), indent=2))


    
