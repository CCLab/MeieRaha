#

from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.template import Context, loader

from models import BubblesForm, Bubbles

from md5 import md5

import json, datetime, cc.settings as settings

# @csrf_exempt # commented out because session framework is disabled
def save (request):
  'Receives form with "bubbles field", un-JSON-s it and saves to pickled model field.'

  def slug(seed):
    "Calculates data's slug - MD5 of JSON-ified data array."
    result = md5(seed).hexdigest()
    return result

  #
  
  if request.method == "POST":
    
    # receiving bubbles list from the browser

    bubbles_form = BubblesForm(request.POST)
    bubbles_list = bubbles_form['bubbles']

    slug_text = slug(str(bubbles_list))

    # finding if there is already such slug stored

    stored_bubbles = Bubbles.objects.filter(slug__exact=slug_text)

    if not len(stored_bubbles):
      bubbles = Bubbles(bubbles=bubbles_list, slug=slug_text)
      bubbles.save()

#    except Bubbles.MultipleObjectsReturned:
 #     bubbles = Bubbles.objects.all()[0]

#    bubbles = json.loads(request.POST['bubbles'])
#    open('/tmp/form.txt','w').write(str(bubbles))
#    for num, val in bubbles:
#      pass

    return HttpResponse(slug_text)

  
def load (request, slug):
  '''Recives slug URL, checks the database, sets meieraha.data cookie if the URL is valid
  and redirects the browser to main page.'''

  template = loader.get_template('redirect.html')
  
  # response = HttpResponseRedirect(redirect_to='/')
  
  response = HttpResponse(template.render(Context({})))
  
  try: 
    bubbles = Bubbles.objects.get(slug=slug)
  except Bubbles.MultipleObjectsReturned:
    bubbles = Bubbles.objects.filter(slug__exact=slug)[0]
  except Bubbles.DoesNotExist:
    return response
  
  max_age = 60
  expires = datetime.datetime.strftime(datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age), "%a, %d-%b-%Y %H:%M:%S GMT")
    
  response.set_cookie('meieraha.data', slug,
    max_age=max_age, expires=expires, domain=None,
#    max_age=max_age, expires=expires, domain=settings.SESSION_COOKIE_DOMAIN or None,
    secure=None),
#    secure=settings.SESSION_COOKIE_SECURE or None)
  return response

def data (request, path=''):

  try:
    p = path.split('.')
    lang = p[0]
    year = p[1]
    keyword = p[2]
    
  except IndexError:
    lang='et'
    year='2012'
    keyword='tulud'

#  if True: # test condition
  if request.COOKIES.has_key( 'meieraha.data' ):
    slug = request.COOKIES[ 'meieraha.data' ]

#    bubbles=Bubbles.objects.all()[0] # test condition
    try: 
      bubbles = Bubbles.objects.filter(slug__exact=slug)[0]
      bubbles_json = json.loads(bubbles.bubbles._data()) 
      bubbles_dict = {}
      for num, val in bubbles_json:
        bubbles_dict[num] = val
#      bubbles_dict = { num: val for num, val in bubbles_json }
    except Bubbles.DoesNotExist:
      # invalid slug cookie was supplied, so we reply with original data
      bubbles_dict = {}
#    except Bubbles.MultipleObjectsReturned:

    # reading original data and merging them with the saved
    with open('/var/www/zaprojektuj-ob/data/%s' % path) as f:
      r = f.read()
      s = r.split(' = ')[1].split(';')[0]
      data_dict  = json.loads(s)

      for d in data_dict:
        record_id = d['record_id']
        if record_id in bubbles_dict.keys():          
          d['value'] = bubbles_dict[record_id]
#          open('/tmp/b%s.txt'% record_id,'w').write(str(d))

      result = json.dumps(data_dict)
        
    f.closed

    return HttpResponse('var %s = %s;' % (keyword, result))
  
  else:

    # initial data
    # temporary redirect is the simplest method

    return HttpResponseRedirect(redirect_to="/data/%s" % path)
