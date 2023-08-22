import json as simplejson
import os
from flask import Flask, request, jsonify, abort, render_template, redirect, url_for, session, escape

import json
data={    
}    

with open("static\geojson\mexicoHigh.json","r") as r:
         data=json.load(r)

print(data)

# Config Flask
app = Flask(__name__)
app.secret_key = 'jupiter'
app.config.update(
    DEBUG=True,
    JSON_SORT_KEYS=True
)

# Root
@app.route('/')
@app.route('/index')
def main():
    return render_template('map.html')


#get user
@app.route('/geojsonCP/<id>', methods=['GET'])
def geojson(id):
        with open("static/geojson/Municipios/"+id,"r") as j:
             mydata=json.load(j)
        return jsonify(mydata)


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=45000, debug=True, threaded=True)