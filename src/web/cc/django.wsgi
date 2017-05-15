import os
import sys
import django.core.handlers.wsgi

path = '/var/www/zaprojektuj-ob/'

if path not in sys.path:
    sys.path.append(path)
    sys.path.append('/usr/share/pyshared/django/')

os.environ['DJANGO_SETTINGS_MODULE'] = 'cc.settings'

application = django.core.handlers.wsgi.WSGIHandler()
