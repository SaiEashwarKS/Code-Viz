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
		if lang == 'PY':
			with open("usercode.py", "w") as f:
				f.write(usercode)
			encoded_string = hashlib.md5(usercode.encode()).hexdigest()
			#Popen runs the process in background
			dicttobesent = {"id":encoded_string}
			subprocess.Popen(["python3","python/pythontutor/generate_json_trace.py","usercode.py",encoded_string])
			return Response(status=200,response=json.dumps(dicttobesent),mimetype="application/json")
		elif lang == 'C':
			f = open("usercode.c", "w")
			usercode = usercode + "\nint rsrsaser=0;\n"
			f.write(usercode)
			f.close()
			encoded_string = hashlib.md5(usercode.encode()).hexdigest()
			time_to_run = 200
			if "time" in data:
				time_to_run = int(data["time"])
			if "fns_to_skip" in data:
				subprocess.Popen(["python","C/trace_generator.py","-f","usercode.c","-s",encoded_string,"-t",time_to_run," ".join(data["fns_to_skip"])])
			else:
				subprocess.Popen(["python","C/trace_generator.py","-f","usercode.c","-s",encoded_string,"-t",time_to_run])
			
			f = open("ll.json", "r")
			trace = f.read()
			
			return Response(trace, status=200, mimetype="application/json")

if __name__ == '__main__':
	app.run(debug = True)