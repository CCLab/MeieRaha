import sqlite3, csv
conn = sqlite3.connect("data.db")
#conn.execute("insert into datasets values (9, 1, 'incomes', 'Eesti Riigieelarve 2012 (Tulud)', 'income', 2012, 'et')")
#conn.execute("insert into datasets values (10, 1, 'expenditures', 'Eesti Riigieelarve 2012 (Kulud)', 'expenditure', 2012, 'et')")
#conn.execute("insert into datasets values (11, 1, 'incomes', 'Estonian State Income 2012', 'income', 2012, 'en')")
#conn.execute("insert into datasets values (12, 1, 'expenditures', 'Estonian State Expenditure 2012', 'expenditure', 2012, 'en')")

TULUD_DATASET = 4 # Incomes 2011, in estonian
KULUD_DATASET = 5 # Expenditures 2011, in estonian
def description(id, dataset_id):
    c = conn.execute("select description from records where dataset_id = %d and record_id = %d" % (dataset_id, id))
    v = c.fetchone()
    if v is None:
        return ''
    else:
        return v[0]

def title(id, dataset_id):
    c = conn.execute("select title from records where dataset_id = %d and record_id = %d" % (dataset_id, id))
    v = c.fetchone()
    if v is None:
        return ''
    else:
        return v[0]

tulud = csv.reader(open("newdata.tulud.txt"), delimiter=',', quotechar='"')
tulud = map(lambda row: (int(row[0]), unicode(row[1], 'utf8'), int(row[2]), int(row[3]), description(int(row[0]), TULUD_DATASET), title(int(row[0]), TULUD_DATASET) == unicode(row[1], 'utf8')), tulud)

TULUD_NEW = 9
KULUD_NEW = 10

for r in tulud:
    sql = "insert into records (dataset_id, record_id, parent_id, title, description, value) values (?,?,?,?,?,?)"
    conn.execute(sql, (TULUD_NEW, r[0], r[3], r[1], r[4], r[2]))

kulud = csv.reader(open("newdata.kulud.txt"), delimiter=',', quotechar='"')
kulud = map(lambda row: (int(row[0]), unicode(row[1], 'utf8'), int(row[2]), int(row[3]), description(int(row[0]), KULUD_DATASET), title(int(row[0]), KULUD_DATASET) == unicode(row[1], 'utf8')), kulud)

for r in kulud:
    sql = "insert into records (dataset_id, record_id, parent_id, title, description, value) values (?,?,?,?,?,?)"
    conn.execute(sql, (KULUD_NEW, r[0], r[3], r[1], r[4], r[2]))

# English
TULUD_EN = 1
KULUD_EN = 2
TULUD_NEW_EN = 11
KULUD_NEW_EN = 12
# First copy the estonian part
tulud = csv.reader(open("newdata.tulud.txt"), delimiter=',', quotechar='"')
tulud = map(lambda row: (int(row[0]), unicode(row[1], 'utf8') if title(int(row[0]), TULUD_DATASET) != unicode(row[1], 'utf8') else title(int(row[0]), TULUD_EN), int(row[2]), int(row[3]), description(int(row[0]), TULUD_EN)), tulud)
for r in tulud:
    sql = "insert into records (dataset_id, record_id, parent_id, title, description, value) values (?,?,?,?,?,?)"
    conn.execute(sql, (TULUD_NEW_EN, r[0], r[3], r[1], r[4], r[2]))

kulud = csv.reader(open("newdata.kulud.txt"), delimiter=',', quotechar='"')
kulud = map(lambda row: (int(row[0]), unicode(row[1], 'utf8') if title(int(row[0]), KULUD_DATASET) != unicode(row[1], 'utf8') else title(int(row[0]), KULUD_EN), int(row[2]), int(row[3]), description(int(row[0]), KULUD_EN)), kulud)

for r in kulud:
    sql = "insert into records (dataset_id, record_id, parent_id, title, description, value) values (?,?,?,?,?,?)"
    conn.execute(sql, (KULUD_NEW_EN, r[0], r[3], r[1], r[4], r[2]))

# WRITE TABLES
def save_table(table_name):
    r = conn.execute("select * from %s" % table_name)
    rows = r.fetchall()
    rows = map(lambda row: map(lambda value: unicode(value).encode("utf-8") if value is not None else '', row), rows)
    with open('%s.csv' % table_name,'wb') as f:
        f.write('\xef\xbb\xbf')
        w = csv.writer(f, delimiter='\t', lineterminator='\n')
        w.writerows(rows)

save_table('records')
save_table('datasets')

# Load tables
table_name = 'records'
with open('%s.txt' % table_name, 'r') as f:
    r = csv.reader(f, delimiter='\t')
    conn.execute('delete from %s' % table_name)
    for row in r:
        row = map(lambda x: unicode(x, 'utf-8'), row)
        sql = 'insert into %s values (%s)' % (table_name, ','.join(['?']*len(row)))
        conn.execute(sql, row)





    
