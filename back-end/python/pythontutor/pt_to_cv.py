import json
from typing import *

global_ids = dict()
classes_functions = set()
class_function_ids = set()
id_counter = 1000


'''
Input format

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

def handle_global_var(variables:List, classes:List) -> List:
	global id_counter
	global global_ids
	
	cviz_gvar = []
	for var in variables:
		if var['type'] == 'ptr' and var['val'] in class_function_ids:
			continue
		if var['name'] not in classes_functions:
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
	
'''
INPUT FOR STACK FRAME: 
"StackFrame": [
        {
          "func_name": "recurse",
          "is_parent": false,
          "frame_id": 1,
          "parent_frame_id_list": [],
          "encoded_locals": [
            {
              "type": "var",
              "data_type": "int",
              "val": 27,
              "name": "a"
            }
          ],
          "is_zombie": false,
          "is_highlighted": true,
          "unique_hash": "recurse_f1"
        }
      ]

'''
def handle_stack_frame(functions:List) -> List:
	global id_counter
	global global_ids

	while(functions and functions[-1]["func_name"].startswith("__") and functions[-1]["func_name"].endswith("__")):
		functions.pop()

	cviz_svar = []

	if functions:
		current_function = functions[-1]
		fn_name = current_function["unique_hash"]
		for var in current_function["encoded_locals"]:
			if var["name"].startswith("__") and var["name"].endswith("__"):
				continue
			
			if var['type'] == 'ptr' and var['val'] in class_function_ids:
				continue
			
			curdic = dict(type=var["type"], val=var["val"], name=var["name"])

			local_unique_name = fn_name + var["name"]
			
			if local_unique_name not in global_ids:
				global_ids[local_unique_name] = id_counter
				id_counter += 1
				
			curdic["id"] = global_ids[local_unique_name]
			
			if "data_type" in var:
				curdic["data_type"] = var["data_type"]
			cviz_svar.append(curdic.copy())
		
	return cviz_svar

'''
Input format

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
def handle_heap_var(variables:List) -> List:
	cviz_hvar = []
	global classes
	for var in variables:
		if "data_type" in var:
			if var['data_type'] in ['CLASS', 'FUNCTION']:
				classes_functions.add(var['val'][0])
				class_function_ids.add(var['id'])
			elif var['data_type'] == 'INSTANCE':
				new = dict(id=var['id'], data_type=var['val'][0])
				new['val'] = []
				for i in var['val'][1:]:
					temp={'type':i[1]['type'], 'name':i[0]['val'], 'val':i[1]['val']}
					if 'data_type' in i[1]:
						temp['data_type'] = i[1]['data_type']
					new['val'].append(temp)
				new['type'] = 'var'
				cviz_hvar.append(new)
			elif var['data_type'] == 'DICT':
				new = dict(id=var['id'], data_type=var['data_type'])
				new['val'] = []
				for i in var['val']:
					temp={'type':i[1]['type'], 'name':i[0]['val'], 'val':i[1]['val']}
					if 'data_type' in i[1]:
						temp['data_type'] = i[1]['data_type']
					new['val'].append(temp)
				new['type'] = 'var'
				cviz_hvar.append(new)
			elif var['data_type'] == 'HEAP_PRIMITIVE':
				new = dict(id=var['id'], data_type=var['val'][0], type='var')
				new['val'] = var['val'][1]
				new['type'] = 'var'
				cviz_hvar.append(new)
			else:
				new = dict(id=var['id'], data_type=var['data_type'])
				new['val'] = var['val']
				new['type'] = 'var'
				cviz_hvar.append(new)
	return cviz_hvar


def format_trace(trace:List[Dict]):
	cv_lineno = 0
	new_trace = []
	global classes
	steps_count = len(trace)
	
	step = 0
	for entry in trace:
		step += 1
		if entry['LineNum'] == cv_lineno:
			continue
		if entry['event'] == 'return' and step < steps_count - 2:
			continue
		if 'exception_msg' in entry:
			new_trace.append(dict(exception_msg=entry['exception_msg']))
			break
	
		pt_lineno = entry['LineNum']
		stackdepth = entry['stackdepth']
		
		# Function
		cviz_function = dict(LineNum=cv_lineno, stackdepth=stackdepth, type='Function')
		if len(entry['StackFrame']) != 0:
			name=entry['StackFrame'][-1]['func_name']
			cviz_function['name'] = name
		
		# Heap
		Contents = handle_heap_var(entry['Heap'])
		cviz_heap = dict(LineNum=cv_lineno, type='Heap', Contents=Contents)
		
		# Global
		Contents = handle_global_var(entry['GlobalVariables'], classes_functions)
		cviz_gvar = dict(LineNum=cv_lineno, type='GlobalVariables', Contents=Contents)
		
		# StackFrame
		Contents = handle_stack_frame(entry['StackFrame'])
		cviz_stack_frame = dict(LineNum=cv_lineno, type='StackFrame', Contents=Contents)
		
		new_trace.extend([cviz_function, cviz_heap, cviz_gvar, cviz_stack_frame])
		
		cv_lineno = pt_lineno
		
	return new_trace
	

if __name__ == '__main__':
	f = open('trace.json','r')
	tr = f.read()
	tr = json.loads(tr)['trace']
	new_tr = format_trace(tr)
	Lines_Data = dict(Lines_Data=new_tr)
	trace_json = json.dumps(Lines_Data, indent=2)
	newf=open("cv.json","w")
	print(trace_json)
	newf.write(trace_json)
	
	
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

    
