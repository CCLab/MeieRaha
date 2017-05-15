import csv, json
recs = []
with open("all_records.txt") as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    for r in reader:
        recs.append({"dataset_id": int(r[0]), \
                     "record_id": int(r[1]), \
                     "parent_id": int(r[2]), \
                     "value": int(r[3]), \
                     "title_et": unicode(r[4],'utf-8'), \
                     "title_en": unicode(r[5],'utf-8'), \
                     "description_et": unicode(r[6], 'utf-8'),\
                     "description_en": unicode(r[7], 'utf-8')})
#

datasets = [(1, 2011, 'tulud'), (2, 2011, 'kulud'), (3, 2012, 'tulud'), (4, 2012, 'kulud'), (10, 0, 'scales')]

for lang in ['en','et']:
    for r in recs: 
        r["description"] = r["description_%s"%lang]
        r["title"] = r["title_%s"%lang]
    for (d, yr, name) in datasets:
        selection = filter(lambda x: x["dataset_id"] == d, recs)
        with open('%s.%d.%s.js' % (lang, yr, name), 'w') as f:
            f.write('var %s = ' % name)
            f.write(json.dumps(selection))
            f.write(';\n');
        with open('%s.%d.%s.csv' % (lang, yr, name), 'w') as f:
            for r in selection:
                f.write('\t'.join([str(r["record_id"]), r["title"].encode("utf-8"), str(r["value"]), str(r["parent_id"])]))
                f.write('\n')
