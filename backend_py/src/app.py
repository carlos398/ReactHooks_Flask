from flask_pymongo import PyMongo, ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

CORS(app)

# se crean las colecciones cuando son llamadas mongo ces basado en colecciones
db = mongo.db.users


@app.route('/users', methods = ['POST'])
def createUsers():
    id = db.insert({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    })

    return jsonify(str(ObjectId(id)))


@app.route('/users', methods = ['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)


@app.route('/user/<id>', methods = ['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})

    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name':user['name'],
        'email': user['email'],
        'password': user['password']
    })


@app.route('/users/<id>', methods = ['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'usuario eliminado'})


@app.route('/users/<id>', methods = ['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set':{
        'name':request.json['name'],
        'email':request.json['email'],
        'password':request.json['password']
    }})
    return jsonify({'msg': 'usuario actualizado'})


if  __name__ == '__main__':
    app.run(debug=True)