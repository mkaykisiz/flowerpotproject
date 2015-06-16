# coding=utf-8
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models.query_utils import Q
from django.views.decorators.csrf import csrf_exempt
from flowerpot.forms import SignupForm

__author__ = 'barisariburnu'

from django.shortcuts import render, render_to_response
from django.template import RequestContext
from flowerpot.models import *
from django.http import HttpResponseRedirect, HttpResponse


@login_required
@csrf_exempt
def view_profile(request, username):
    follower_list_cover = []
    follow_status = ['Takip Et', 'Takibi Bırak']
    if User.objects.filter(username=username).exists():
        try:
            user = User.objects.get(username=username)
            user_detail = UserDetails.objects.get(user=user)
            follower_list_cover = UserDetails.objects.filter(
                user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
            if request.method == 'POST' and request.POST.get('status'):
                print request.FILES.getlist('file')
                print request.POST.get('status')
                status_content = str(request.POST.get('status')).replace(" ", "")
                print status_content
                status_content = status_content.split('=')
                if str(status_content[0]) == 'kilo' and int(status_content[1])/1:
                    new_status = Status.objects.create(type='WT', user=user, content=status_content[1])
                else:
                    new_status = Status.objects.create(type='ST', user=user, content=request.POST.get('status'))
                new_status.save()
                for file_image in request.FILES.getlist('file'):
                    status_photos = StatusPhotos.objects.create(status=new_status, photo=file_image)
                    status_photos.save()
                    print status_photos
        except Exception as e:
            print e
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('profile/index.html', locals(), context_instance=RequestContext(request))


@login_required
def view_about(request, username):
    follower_list_cover = []
    follow_status = ['Takip Et', 'Takibi Bırak']
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        user_detail = UserDetails.objects.get(user=user)
        follower_list_cover = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
        follower_list_about = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:15])

        status_photo_list = StatusPhotos.objects.filter(status__user=user)[:18]
        blog_list = Blog.objects.all()
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('profile/about.html', locals(), context_instance=RequestContext(request))


@login_required
def view_followers(request, username):
    all_follower_list = []
    follow_status = ['Takip et', 'Takip ediliyor']
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        is_followed_by_me = Follow.objects.filter(followed=user, follower=request.user)
        user_detail = UserDetails.objects.get(user=user)
        follower_list_cover = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
        followers = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values(
                'follower').order_by('?'))
        for follower in followers:
            f_f_list = UserDetails.objects.filter(
                user__in=Follow.objects.filter(followed=follower).values('follower')).order_by('?')[:5]
            photos_count = StatusPhotos.objects.filter(status__user=user).count()
            follow_count = Follow.objects.filter(followed=follower).count()
            if Follow.objects.filter(followed=follower, follower_id=request.user.id).exists():
                all_follower_list.append([follower, f_f_list, photos_count, follow_count, True])
            else:
                all_follower_list.append([follower, f_f_list, photos_count, follow_count, False])
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('profile/followers.html', locals(), context_instance=RequestContext(request))


@login_required
def view_followeds(request, username):
    all_follower_list = []
    follow_status = ['Takip et', 'Takip ediliyor']
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        is_followed_by_me = Follow.objects.filter(followed=user, follower=request.user)
        user_detail = UserDetails.objects.get(user=user)
        follower_list_cover = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
        followed_list = UserDetails.objects.filter(
            user__in=Follow.objects.filter(follower=user).values(
                'followed'))
        for followed in followed_list:
            f_f_list = UserDetails.objects.filter(
                user__in=Follow.objects.filter(follower=followed).values('follower')).order_by('?')[:5]
            photos_count = StatusPhotos.objects.filter(status__user=user).count()
            follow_count = Follow.objects.filter(follower=followed).count()
            if Follow.objects.filter(follower=followed, followed_id=request.user.id).exists():
                all_follower_list.append([followed, f_f_list, photos_count, follow_count, True])
            else:
                all_follower_list.append([followed, f_f_list, photos_count, follow_count, False])
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('profile/followeds.html', locals(), context_instance=RequestContext(request))


@login_required
def messages(request):
    try:
        send = Message.objects.filter(send_id=request.user.id).distinct(
            'to').values_list("to", flat=True)
        to = Message.objects.filter(to_id=request.user.id).distinct(
            'send').values_list("send", flat=True)
        message_list = UserDetails.objects.filter(Q(user_id__in=send) | Q(user_id__in=to))
    except Exception as e:
        print e
    return render_to_response('messages/index.html', locals(), context_instance=RequestContext(request))


@login_required
def messages_detail(request, username):
    user_active = User.objects.get(username=username)
    user_detail_active = UserDetails.objects.get(user=user_active)
    my_detail_active = UserDetails.objects.get(user=request.user)
    send = Message.objects.filter(send_id=request.user.id).distinct(
        'to').values_list("to", flat=True)
    to = Message.objects.filter(to_id=request.user.id).distinct(
        'send').values_list("send", flat=True)
    message_list = UserDetails.objects.filter(Q(user_id__in=send) | Q(user_id__in=to))

    my_messages_list = Message.objects.filter(Q(send=user_active) | Q(to=user_active)).order_by('-date')
    if request.method == 'POST':
        new_message = Message.objects.create(content=request.POST.get('content'), send=request.user, to=user_active)
    return render_to_response('messages/detail.html', locals(), context_instance=RequestContext(request))


@csrf_exempt
@login_required
def add_followed(request):
    try:
        followed = request.POST.get('followed')
        is_followed = Follow.objects.filter(follower=request.user, followed_id=int(followed))
        if is_followed:
            is_followed.delete()
            print "silindi"
        else:
            new_follow = Follow.objects.create(follower=request.user, followed_id=int(followed))
            new_follow.save()
            print "eklendi"
    except Exception as e:
        print e
    return HttpResponse(True)


@login_required
def sorry(request):
    print "sorry"
    return render_to_response('sorry.html', locals(), context_instance=RequestContext(request))


@transaction.atomic
@csrf_exempt
def sign_up(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/')
    form = SignupForm()
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            try:
                email = request.POST.get('email')
                if User.objects.filter(email=email).exists():
                    raise form.ValidationError("This email already used")
                username = request.POST.get('username')
                if User.objects.filter(username=username).exists():
                    raise form.ValidationError("This email already used")
                first_name = request.POST.get('first_name')
                last_name = request.POST.get('last_name')
                password = request.POST.get('password')
                user_auth = User.objects.create_user(username, email, password)
                user_auth.fist_name = first_name
                user_auth.last_name = last_name
                user_auth.is_staff = False
                user_auth.is_active = True
                user_auth.save()
                member = User.objects.filter(username=username)[0]
                user = UserDetails.objects.create(user_id=member.id)
                user.save()
                return HttpResponseRedirect('/accounts/login/')
            except Exception as e:
                print e
    return render_to_response('signup.html', {'form': form},
                              context_instance=RequestContext(request))


def home_page(request):
    return render_to_response('home_page.html', locals(), context_instance=RequestContext(request))