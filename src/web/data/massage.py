
import json

with open('et.2012.kulud.js','r') as f:

  r = f.read()
  m = r.split(' = ')
  print len(m)
  foo = json.loads(m[1].strip(';')) 
  print foo
f.closed
