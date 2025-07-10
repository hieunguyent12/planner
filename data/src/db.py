import sqlite3

catalog_con = sqlite3.connect("../db/uf/catalog.db")
soc_con = sqlite3.connect("../db/uf/soc_2248.db")

catalog_cur = catalog_con.cursor()
soc_cur = soc_con.cursor()

catalog_cur.execute(
    """
    CREATE TABLE IF NOT EXISTS catalog (
        id              INTEGER PRIMARY KEY,
        code            TEXT UNIQUE, 
        name            TEXT, 
        credits         TEXT, 
        subject         TEXT, 
        description     TEXT, 
        prerequisite    TEXT,
        corequisite     TEXT
    )
    """
)


soc_cur.executescript(
    """
    CREATE TABLE IF NOT EXISTS soc (
        id              INTEGER PRIMARY KEY,
        code            TEXT,
        name            TEXT,
        sections        TEXT,
        description     TEXT,
        prerequisites   TEXT
    )
    """
    # CREATE TABLE IF NOT EXISTS sections (
    #     id                  INTEGER PRIMARY KEY,
    #     course_number,      TEXT,
    #     code                TEXT,
    #     meetings            TEXT,
    #     FOREIGN KEY(code) REFERENCES soc(code)
    # )
    #     location            TEXT,
    # days                TEXT,
    # start_time          TEXT,
    # end_time            TEXT,
)
