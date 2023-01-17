import sqlite3

def selec_status(var):
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    posts = cursor.execute(f'SELECT * FROM status_fpq WHERE cemb={var} OR pn_topo="{var}"').fetchall()
    conn.close()
    if len(posts)==0:
        posts=""
        return posts
    else:
        return posts

def inserir(result):
    conn = sqlite3.connect('fpq_status.db')
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO contato_processo (nome, motivo, descricao) VALUES (?, ?, ?)", (result['nome'], result['motivo'], result['descricao']))
    print(result['nome'], result['motivo'], result['descricao'])
    conn.commit()
    conn.close()
    return "Informações inseridas no DB"
