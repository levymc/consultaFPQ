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

@app.route("/send", methods = ["POST"])
def send():
    output = request.get_json()
    result = json.loads(output) #this converts the json output to a python dictionary
    print(result) # Printing the new dictionary
    insert_message = sqlite_funcs.inserir(result)
    nome = result['nome']
    motivo = result['motivo']
    desc = result['descricao']
    msg = Message('ERRO - FPQ CONSULTA', sender = 'aeb0b9af40e392', recipients = ['processo5@tecplas.com.br', 'processo3@tecplas.com.br', 'processo4@tecplas.com.br', 'dany@tecplas.com.br'])
    msg.body = f"""
        Usuário:       {nome}
        Motivo:       {motivo}
        Descrição:       {desc}
        """
    # msg.html = "<b>Hey Paul</b>, sending you this email from my <a href="https://google.com">Flask app</a>, lmk if it works"
    mail.send(msg)
    return result

@app.route("/resultado", methods=["POST", "GET"])
def resultado():
    global msg_
    if request.method == 'POST':
        msg_ = request.values.get('input_2') if request.values.get('input_2') else ''
        try:
            if msg_ =='':
                flash(f"Digite algo para pesquisar", "error")
                return render_template('index.html')
            else:
                posts = sqlite_funcs.selec_status(msg_)
                print(posts)
                return render_template('index.html', msg_=msg_, posts=posts)
        except sqlite3.OperationalError as e: 
            flash(f"Peça não encontrada, digite novamente !", "warning")
            return render_template('index.html', msg_=0), print(type(e), e)
    else: return render_template('index.html', msg_=0) 

@app.route("/info", methods=["POST", "GET"])
def info():
    return sqlite_funcs.selec_status(msg_)
    

if __name__ == '__main__':
    if mode == 'dev':
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        serve(app, host='0.0.0.0', port=5000, threads=5, url_scheme='https')