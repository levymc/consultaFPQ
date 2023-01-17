import sqlite3
try:    
    result = {'nome': 'Levy', 'motivo': 'Erro', 'descricao': '(((((99999((()))'}
    conn = sqlite3.connect(r'fpq_status.db')
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO contato_processo (nome, motivo, descricao) VALUES ('Levy', 'Erro', 'AAAAA')")
    print(result['nome'], result['motivo'], result['descricao'])
    conn.commit()
except Exception as e: print(e)