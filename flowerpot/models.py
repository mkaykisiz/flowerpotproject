# coding=utf-8
from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Cities(models.Model):
    name = models.CharField(max_length=15, default='', null=False, blank=False)

    def __unicode__(self):
        return self.name


class ShareGroup(models.Model):
    name = models.CharField(max_length=250, null=False, blank=False)
    date = models.DateTimeField(auto_now_add=True)


class UserAndShareGroup(models.Model):
    user = models.ForeignKey(User)
    share_group = models.ForeignKey(ShareGroup)


class UserDetails(models.Model):
    USER_TYPE = (
        (u'0', 'Obez'),
        (u'1', 'O Eskidendi'),
        (u'2', 'Saç Stilisti'),
        (u'3', 'Giyim Uzmanı'),
        (u'4', 'Diyetisyen'),
        (u'5', 'Giyim Firması'),
    )
    user = models.ForeignKey(User)
    type = models.CharField(max_length=1, choices=USER_TYPE, default='0')
    profile_photo = models.ImageField(null=True, blank=True, upload_to="profile_photos/")
    cover_photo = models.ImageField(null=True, blank=True, upload_to="cover_photos/")
    description = models.CharField(max_length=500, default='', null=False, blank=False)
    website = models.CharField(max_length=50, default='', null=True, blank=True)
    school = models.CharField(max_length=50, default='', null=False, blank=False)
    jobs = models.CharField(max_length=50, default='', null=False, blank=False)
    birthday = models.DateTimeField(null=True, blank=True)
    been = models.ForeignKey(Cities, related_name='bean', default=1)
    lives_in = models.ForeignKey(Cities, related_name='live_in', default=1)
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.user.username


class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='follower')
    followed = models.ForeignKey(User, related_name='followed')
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.follower.username+', '+self.followed.username+"\'i takip ediyor"


class Message(models.Model):
    content = models.CharField(max_length=180, default='', null=True, blank=True)
    send = models.ForeignKey(User, related_name='send')
    to = models.ForeignKey(User, related_name='to')
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.send.username + ", " + self.to.username + " \'e Mesaj send" + "-" + str(self.date)


class Status(models.Model):
    STATUS_TYPE_CHOICES = (
        ('ST', 'Status'),
        ('WT', 'Weight')
    )
    content = models.CharField(max_length=180, default='', null=True, blank=True)
    type = models.CharField(max_length=2, choices=STATUS_TYPE_CHOICES, default='ST')
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class StatusPhotos(models.Model):
    photo = models.ImageField(null=True, blank=True, upload_to="status_photos/")
    status = models.ForeignKey(Status, default=1)
    date = models.DateTimeField(auto_now_add=True)


class StatusLike(models.Model):
    status = models.ForeignKey(Status)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class StatusComment(models.Model):
    content = models.CharField(max_length=250, null=False, blank=False)
    status = models.ForeignKey(Status)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class Blog(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False, default='blog yazısı')
    content = models.CharField(max_length=1000, null=False, blank=False)
    photo = models.ImageField(null=True, blank=True, upload_to="blog_photos/")
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class BlogLike(models.Model):
    blog = models.ForeignKey(Blog)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class BlogComment(models.Model):
    content = models.CharField(max_length=250, null=False, blank=False)
    blog = models.ForeignKey(Blog)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class ShareGroupStatus(models.Model):
    content = models.CharField(max_length=180, default='', null=True, blank=True)
    user = models.ForeignKey(User)
    share_group = models.ForeignKey(ShareGroup)
    date = models.DateTimeField(auto_now_add=True)


class ShareGroupStatusPhotos(models.Model):
    share_group_status = models.ForeignKey(ShareGroupStatus, default=1)
    photo = models.ImageField(null=True, blank=True, upload_to="group_status_photos/")
    date = models.DateTimeField(auto_now_add=True)


class ShareGroupStatusLike(models.Model):
    status = models.ForeignKey(ShareGroupStatus)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)


class ShareGroupStatusComment(models.Model):
    content = models.CharField(max_length=250, null=False, blank=False)
    group_status = models.ForeignKey(ShareGroupStatus)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)