from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^json/$', 'cc.views.home', name='home'),
    # url(r'^cc/', include('cc.budget.urls')),
    url(r'^save/$', 'cc.budget.views.save'),
    url(r'^load/(?P<slug>.*)/$', 'cc.budget.views.load'),                       
    url(r'^data/(?P<path>.*)/$', 'cc.budget.views.data'),
                       
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
