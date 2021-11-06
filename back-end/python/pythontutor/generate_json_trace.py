# Generates a JSON trace that is compatible with the js/pytutor.js frontend

import sys, pg_logger, json
from optparse import OptionParser

# To make regression tests work consistently across platforms,
# standardize display of floats to 3 significant figures
#
# Trick from:
# http://stackoverflow.com/questions/1447287/format-floats-with-standard-json-module
json.encoder.FLOAT_REPR = lambda f: ('%.3f' % f)

def json_finalizer(input_code, output_trace):
	ret = dict(code=input_code, trace=output_trace)
	# sort_keys=True leads to printing in DETERMINISTIC order, but might
	# screw up some old tests ... however, there is STILL non-determinism
	# in Python 3.3 tests, ugh!
	json_output = json.dumps(ret, indent=INDENT_LEVEL)
	return json_output

def js_var_finalizer(input_code, output_trace):
	global JS_VARNAME
	ret = dict(code=input_code, trace=output_trace)
	json_output = json.dumps(ret, indent=None)
	return "var %s = %s;" % (JS_VARNAME, json_output)

parser = OptionParser(usage="Generate JSON trace for pytutor")
parser.add_option('-c', '--cumulative', default=False, action='store_true',
				help='output cumulative trace.')
parser.add_option('-p', '--heapPrimitives', default=False, action='store_true',
				help='render primitives as heap objects.')
parser.add_option('-o', '--compact', default=False, action='store_true',
				help='output compact trace.')
parser.add_option('-i', '--input', default=False, action='store',
				help='JSON list of strings for simulated raw_input.', dest='raw_input_lst_json')
parser.add_option("--create_jsvar", dest="js_varname", default=None,
									help="Create a JavaScript variable out of the trace")
parser.add_option("--code", dest="usercode", default=None,
									help="Load user code from a string instead of a file and output compact JSON")

(options, args) = parser.parse_args()
INDENT_LEVEL = None if options.compact else 2

#cviz

if options.usercode:
	INDENT_LEVEL = None
	#print(pg_logger.exec_script_str_local(options.usercode,
	 #                                     options.raw_input_lst_json,
		#                                    options.cumulative,
		 #                                   options.heapPrimitives,
			#                                  json_finalizer))
	out_trace = pg_logger.exec_script_str_local(options.usercode,
																	options.raw_input_lst_json,
																	options.cumulative,
																	options.heapPrimitives,
																	json_finalizer)
	#print(out_trace)
	
else:
	fin = sys.stdin if args[0] == "-" else open(args[0])
	if options.js_varname:
		JS_VARNAME = options.js_varname
		#print(pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, js_var_finalizer))
		out_trace = pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, js_var_finalizer)
		#print(out_trace)
	else:
		#print(pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, json_finalizer))
		out_trace = pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, json_finalizer)
		#print(out_trace)
		
import json
from typing import *

global_ids = dict()
classes_functions = set()
class_function_ids = set()
id_counter = 1000

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
		
		if 'exception_msg' in entry:
			exception = dict(type='Exception',message=entry['exception_msg'])
			if 'line' in entry:
				exception['LineNum'] = entry['line']
			if 'offset' in entry:
				exception['offset'] = entry['offset']
				
			if entry['event'] == 'instruction_limit_reached':
				exception['message'] = 'Please shorten your code,\nCode-Viz is not designed to handle long-running code.'
			
			new_trace.append(exception)
			break
		
		if entry['LineNum'] == cv_lineno:
			continue
		if entry['event'] == 'return' and step < steps_count - 2:
			continue
	
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

tr = json.loads(out_trace)
#print(type(tr))
new_tr = format_trace(tr['trace'])
Lines_Data = dict(Lines_Data=new_tr)
trace_json = json.dumps(Lines_Data, indent=2)

file_name = sys.argv[2] + ".json"
newf=open(file_name,"w")
#print(trace_json)
newf.write(trace_json)
