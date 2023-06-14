from flask import Flask, render_template, request, flash
import sqlite3, requests, sqlite_funcs, json
from flask_mail import Mail, Message
from tkinter import messagebox
from werkzeug.exceptions import abort
from waitress import serve
import logging

mode = "dev" #prod ou dev

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'levytecplas@gmail.com'
app.config['MAIL_PASSWORD'] = 'pjuamxrpynilleto'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

@app.route("/", methods=["POST", "GET"])
def index():
    return render_template('index.html')

@app.route("/confereStats", methods=["POST", "GET"])
def confereStats():
    global userInput
    userInput = request.json['valor']
    # print(userInput)
    return sqlite_funcs.selec_status(userInput)

@app.route("/atualizaStatus", methods=["POST", "GET"])
def atualizaStatus():
    cod = request.json['cod']
    status = request.json['status']
    print("aqii", cod, status)
    return sqlite_funcs.atualizar_status(cod, status)

@app.route('/removeCEMB', methods=["POST", "GET"])
def removeCEMB():
    cod = request.json['cod']
    return sqlite_funcs.remover_linha(cod)

@app.route('/adicionarPN', methods=["POST", "GET"])
def adicionarPN():
    data = request.json
    print(data)
    return sqlite_funcs.inserir(data)

@app.route("/info", methods=["POST", "GET"])
def info():
    return sqlite_funcs.selec_status(userInput)


if __name__ == '__main__':
    if mode == 'dev':
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        serve(app, host='0.0.0.0', port=5000, threads=5, url_scheme='https')