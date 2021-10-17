from flask import Flask, render_template, request, redirect, url_for, jsonify, Response
import requests
import json
import os

from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)

cors = CORS(app)
api = Api(app)


@app.route('/api/tracegenerator', methods=['POST'])
def get_trace():
	if request.method == 'POST':
		data = request.get_json()
		lang = data['language']
		usercode = data['code']
		if lang == 'PY':
			f = open("usercode.py", "w")
			f.write(usercode)
			os.system('python python\\pythontutor\\generate_json_trace.py usercode.py')
			os.system('python python\\pythontutor\\pt_to_cv.py')
			f.close()
			f = open("cv.json", "r")
			trace = f.read()
			#os.system('rm usercode.py cv.json trace.json')
			return Response(trace, status=200, mimetype="application/json")
		elif lang == 'C':
			f = open("usercode.c", "w")
			f.write(usercode)
			os.system('python C\\trace_generator.py -f usercode.c')
			f.close()
			f = open("ll.json", "r")
			trace = f.read()
			#os.system('rm usercode.py cv.json trace.json')
			return Response(trace, status=200, mimetype="application/json")

if __name__ == '__main__':
	app.run(debug = True)