import sqlite3
import hashlib

def selec_status(var):
    print(var)
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    posts = cursor.execute(f'SELECT * FROM status_fpq WHERE cemb={var} OR pn_topo="{var}"').fetchall()
    conn.close()
    if len(posts)==0:
        posts=False
        return posts
    else:
        return posts

# print(selec_status(3540220))

def inserir(result):
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO status_fpq (pn_topo, cemb, status) VALUES (?, ?, ?)", (result['pn'], result['cemb'], result['status']))
    # print(result['nome'], result['motivo'], result['descricao'])
    conn.commit()
    conn.close()
    return "Informações inseridas no DB"

def atualizar_status(cemb, novo_status):
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE status_fpq SET status = ? WHERE cemb = ?", (novo_status, cemb))
    conn.commit()
    conn.close()
    return {'data': True}

def remover_linha(cemb):
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM status_fpq WHERE cemb = ?", (cemb,))
    conn.commit()
    conn.close()
    return {'data': True}

def confereUsuario(usuario, senha):
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM operadores WHERE usuario = ?", (usuario,))
    result = cursor.fetchone()
    conn.close()

    if result:
        stored_usuario, stored_senha = result[2], result[3]
        hashed_senha = hashlib.md5(senha.encode()).hexdigest()
        if hashed_senha == stored_senha:
            return True
    return False