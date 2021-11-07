from flask import Flask, render_template, request, redirect, url_for, jsonify, Response
import requests
import json
import os
import re

from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_cors import CORS, cross_origin
import json
import hashlib
import subprocess

app = Flask(__name__)

cors = CORS(app)
api = Api(app)

import time

di_running_subprocesses = dict()

@app.route('/api/tracegenerator', methods=['POST'])
def get_trace():
	if request.method == 'POST':
		data = request.get_json()
		lang = data['language']

		usercode = data['code'] + "\nint rsrsaser=0;\n" if lang == "C" else data['code']
		encoded_string = hashlib.md5(usercode.encode()).hexdigest()

		li = list(re.finditer(r"printf[.\n\(\)a-z\"0-9A-Z\% +\-*/_,]*;",usercode))
		#print(li)
		for i in li:
			usercode = usercode[:i.start()] + usercode[i.start():i.end()].replace("\n","\\n").replace("\t","\\t") + usercode[i.end():]

		#could have done this, but extensibiltiy of the code gets sacrificed while supporting multiple languages
		#code_file = encoded_string + ".c" if lang == "C" else encoded_string+".py"
		if lang == "C":
			code_file = encoded_string + ".c"
		elif lang == 'PY':
			code_file = encoded_string+".py"
		
		if not(os.path.isfile(code_file)):
			with open(code_file, "w") as f:
				f.write(usercode)

			if lang == 'PY':
				di_running_subprocesses[encoded_string] = subprocess.Popen(["python3","python/pythontutor/generate_json_trace.py",code_file,encoded_string])
				
			elif lang == 'C':				
				time_to_run = str(200)
				if "time" in data:
					time_to_run = str(int(data["time"]))
				if "fns_to_skip" in data:
					di_running_subprocesses[encoded_string] = subprocess.Popen(["python","C/trace_generator.py","-f",code_file,"-s",encoded_string,"-t",time_to_run," ".join(data["fns_to_skip"])])
				else:
					di_running_subprocesses[encoded_string] = subprocess.Popen(["python","C/trace_generator.py","-f",code_file,"-s",encoded_string,"-t",time_to_run])
				
		dicttobesent = {"id":encoded_string}	
		return Response(status=200,response=json.dumps(dicttobesent),mimetype="application/json")

@app.route('/api/traceget', methods=['POST'])
def poller():
	if request.method == "POST":
		data = request.get_json()
		id = data['id']
		location = id + ".json"
		
		if os.path.isfile(location):
			f = open(location,"r")
			trace = f.read()
			f.close()
			if id in di_running_subprocesses:
				di_running_subprocesses[id].terminate()
			return Response(status=200,response=trace,mimetype="application/json")
		else:
			return Response(status=204,response={},mimetype="application/json")





if __name__ == '__main__':
	app.run(debug = True)