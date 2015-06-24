from django.conf.urls import patterns, include, url
from django.conf.urls.static import static

from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from flowerpotproject import settings
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

admin.autodiscover()

urlpatterns = patterns('',

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^sorry/$', 'flowerpot.views.sorry'),
                       url(r'^signup/$', 'flowerpot.views.sign_up'),
                       url(r'^accounts/login/$', 'django.contrib.auth.views.login',
                           {'template_name': 'login.html'}),
                       url(r'^accounts/logout/$', 'django.contrib.auth.views.logout',
                           {'next_page': '/'}),

                       url(r'^remember_password/$', 'flowerpot.views.remember_password'),
                       url(r'^home/$', 'flowerpot.views.home'),
                       url(r'^$', 'flowerpot.views.home_page'),

                       url(r'^search/(?P<username>[a-zA-Z0-9_]+)/$', 'flowerpot.views.search'),


                       url(r'^profile/(?P<username>[a-zA-Z0-9_]+)/$', 'flowerpot.views.view_profile'),
                       url(r'^profile/about/(?P<username>[a-zA-Z0-9_]+)/$', 'flowerpot.views.view_about'),
                       url(r'^profile/followers/(?P<username>[a-zA-Z0-9_]+)/$', 'flowerpot.views.view_followers'),
                       url(r'^profile/followeds/(?P<username>[a-zA-Z0-9_]+)/$', 'flowerpot.views.view_followeds'),
                       url(r'^profile_edit/$', 'flowerpot.views.edit_profile'),

                       url(r'^messages/$', 'flowerpot.views.messages'),
                       url(r'^messages/detail/(?P<username>[a-zA-Z0-9_]+)/$', 'flowerpot.views.messages_detail'),

                       url(r'^group/(.+)/$', 'flowerpot.views.view_group'),
                       url(r'^leave/group/(?P<name>[a-zA-Z0-9_]+)/$', 'flowerpot.views.leave_group'),

                       url(r'^blog/new/$', 'flowerpot.views.new_blog'),
                       url(r'^blog/(?P<bid>[0-9]+)/$', 'flowerpot.views.view_blog'),
                       url(r'^blog/edit/(?P<bid>[0-9]+)/$', 'flowerpot.views.edit_blog'),
                       url(r'^blog/delete/(?P<bid>[0-9]+)/$', 'flowerpot.views.delete_blog'),


                       url(r'^status/delete/(?P<sid>[0-9]+)/$', 'flowerpot.views.delete_status'),
                       url(r'^group_status/delete/(?P<gsid>[0-9]+)/$', 'flowerpot.views.delete_group_status'),
                       url(r'^status_comment/delete/(?P<sid>[0-9]+)/$', 'flowerpot.views.delete_status_comment'),
                       url(r'^group_status_comment/delete/(?P<gsid>[0-9]+)/$',
                           'flowerpot.views.delete_group_status_comment'),


                       url(r'^add_followed/$', 'flowerpot.views.add_followed'),

                       ) + staticfiles_urlpatterns() + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
