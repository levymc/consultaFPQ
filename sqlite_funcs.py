import sqlite3

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
    cursor.execute(f"INSERT INTO status_fpq (pn_topo, cemb, status) VALUES (?, ?, ?)", (result['nome'], result['motivo'], result['descricao']))
    # print(result['nome'], result['motivo'], result['descricao'])
    conn.commit()
    conn.close()
    return "Informações inseridas no DB"
