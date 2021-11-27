import sqlite3
con = sqlite3.connect('meepybot.db')

with con:
    hi = con.execute("SELECT * FROM messages").fetchall()
for elem in hi:
    print(elem)