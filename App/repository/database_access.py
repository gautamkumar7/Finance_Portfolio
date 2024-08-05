import mysql.connector

def get_db_connection():
    mydb = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = 'c0nygre',
        database = 'portfolio'
    )
    return mydb

if __name__ == "__main__":
    conn = get_db_connection()
    print(conn.database)