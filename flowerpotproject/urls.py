from django.conf.urls import patterns, include, url
from django.conf.urls.static import static

from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from flowerpotproject import settings

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'flowerpotproject.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       # url(r'^$', 'flowerpot.views.home'),
                       url(r'^sorry/$', 'flowerpot.views.sorry'),
                       url(r'^signup/$', 'flowerpot.views.sign_up'),
                       url(r'^accounts/login/$', 'django.contrib.auth.views.login',
                           {'template_name': 'login.html'}),
                       url(r'^accounts/logout/$', 'django.contrib.auth.views.logout',
                           {'next_page': '/'}),

                       url(r'^$', 'flowerpot.views.home_page'),


                       url(r'^profile/(?P<username>[a-z]+)/$', 'flowerpot.views.view_profile'),
                       url(r'^profile/about/(?P<username>[a-z]+)/$', 'flowerpot.views.view_about'),
                       url(r'^profile/followers/(?P<username>[a-z]+)/$', 'flowerpot.views.view_followers'),
                       url(r'^profile/followeds/(?P<username>[a-z]+)/$', 'flowerpot.views.view_followeds'),

                       url(r'^messages/$', 'flowerpot.views.messages'),
                       url(r'^messages/detail/(?P<username>[a-z]+)/$', 'flowerpot.views.messages_detail'),


                       url(r'^add_followed/$', 'flowerpot.views.add_followed'),
                       ) + staticfiles_urlpatterns() + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
