from flask import Flask, render_template, request, redirect, url_for, jsonify, Response
import requests
import json
import os

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

@app.route('/api/tracegenerator', methods=['POST'])
def get_trace():
	if request.method == 'POST':
		data = request.get_json()
		lang = data['language']
		usercode = data['code']
		encoded_string = ""

		if lang == 'PY':
			encoded_string = hashlib.md5(usercode.encode()).hexdigest()
			code_file = encoded_string + ".py"
			with open(code_file, "w") as f:
				f.write(usercode)
			#Popen runs the process in background
			dicttobesent = {"id":encoded_string}
			subprocess.Popen(["python3","python/pythontutor/generate_json_trace.py",code_file,encoded_string])
			return Response(status=200,response=json.dumps(dicttobesent),mimetype="application/json")

		elif lang == 'C':
			usercode = usercode + "\nint rsrsaser=0;\n"
			encoded_string = hashlib.md5(usercode.encode()).hexdigest()
			code_file = encoded_string + ".c"
			with open(code_file, "w") as f:
				f.write(usercode)
			time_to_run = 200
			if "time" in data:
				time_to_run = int(data["time"])
			if "fns_to_skip" in data:
				subprocess.Popen(["python","C/trace_generator.py","-f",code_file,"-s",encoded_string,"-t",time_to_run," ".join(data["fns_to_skip"])])
			else:
				subprocess.Popen(["python","C/trace_generator.py","-f",code_file,"-s",encoded_string,"-t",time_to_run])

			dicttobesent = {"id":encoded_string}
			subprocess.Popen(["python3","python/pythontutor/generate_json_trace.py",code_file,encoded_string])
			return Response(status=200,response=json.dumps(dicttobesent),mimetype="application/json")

@app.route('/api/traceget', methods=['POST'])
def poller():
	if request.method == "POST":
		data = request.get_json()
		lang = data['language']
		id = data['id']
		file = id + ".json"
		if lang == "PY":
			location = "python/" + file
		else:
			location = "C/" + file
		
		if os.path.isfile(location):
			f = open(location,"r")
			trace = f.read()
			f.close()
			return Response(status=200,response=trace,mimetype="application/json")
		else:
			return Response(status=204,response={},mimetype="application/json")





if __name__ == '__main__':
	app.run(debug = True)