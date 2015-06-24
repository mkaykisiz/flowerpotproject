# coding=utf-8


from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models.query_utils import Q
from django.views.decorators.csrf import csrf_exempt
from flowerpot.forms import *
from django.shortcuts import render_to_response, render
from django.template import RequestContext
from flowerpot.models import *
from django.http import HttpResponseRedirect, HttpResponse
from mailgun import mailgun


@login_required
@csrf_exempt
def view_profile(request, username):
    status_all_list = []
    follow_status = ['Takip et', 'Takip ediliyor']
    if User.objects.filter(username=username).exists():
        try:
            user = User.objects.get(username=username)
            is_followed_by_me = Follow.objects.filter(followed=user, follower=request.user)
            user_detail = UserDetails.objects.get(user=user)
            if request.method == 'POST' and request.POST.get('status') and request.POST.get('status') != '':
                print request.POST.get('status')
                status_content = request.POST.get('status').replace(" ", "").replace("\n", "")
                status_content_list = status_content.split('=')
                if status_content_list[0] == 'kilo' and int(status_content_list[1]) / 1:
                    print "1"
                    new_status = Status.objects.create(type='WT', user=user, content=status_content_list[1])
                else:
                    new_status = Status.objects.create(type='ST', user=user, content=request.POST.get('status'))
                    print "2"
                new_status.save()
                for file_image in request.FILES.getlist('file'):
                    status_photos = StatusPhotos.objects.create(status=new_status, photo=file_image)
                    status_photos.save()
            if request.method == 'POST' and 'comment' in request.POST and request.POST.get('comment') != '':
                print request.POST.get('comment')
                print request.POST
                new_comment = StatusComment.objects.create(content=request.POST.get('comment'),
                                                           status_id=int(request.POST.get('comment_status')),
                                                           user=request.user)
                new_comment.save()
                print "save"
                return HttpResponseRedirect('/profile/' + username + '/#' + str(request.POST.get('status')))
            follower_list_cover = UserDetails.objects.filter(
                user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
            status_list = Status.objects.filter(user=user, type='ST').order_by('-date')
            for status in status_list:
                status_photo_list = StatusPhotos.objects.filter(status=status)
                status_comment_list = StatusComment.objects.filter(status=status).order_by('date')
                comment_info = []
                for comment in status_comment_list:
                    comment_user_detail = UserDetails.objects.get(user=comment.user)
                    comment_info.append([comment, comment_user_detail])
                status_like_list = StatusLike.objects.filter(status=status)
                status_all_list.append([status, status_photo_list, comment_info, status_like_list])
        except Exception as e:
            print e
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('profile/index.html', locals(), context_instance=RequestContext(request))


@login_required
def view_about(request, username):
    follower_list_cover = []
    follow_status = ['Takip et', 'Takip ediliyor']
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        user_detail = UserDetails.objects.get(user=user)
        is_followed_by_me = Follow.objects.filter(followed=user, follower=request.user)
        weight_list = Status.objects.filter(type='WT', user=user)
        follower_list_cover = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
        follower_list_about = UserDetails.objects.filter(
            user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:15])
        group_list = ShareGroup.objects.filter(
            id__in=UserAndShareGroup.objects.filter(user=user).values('share_group'))
        status_photo_list = StatusPhotos.objects.filter(status__user=user)[:18]
        blog_list = Blog.objects.filter(user=user)
        if request.method == 'POST':
            if ShareGroup.objects.filter(name=request.POST.get('group_name')):
                print "var"
                if not UserAndShareGroup.objects.filter(user=request.user, share_group=ShareGroup.objects.get(
                        name=request.POST.get('group_name').encode('utf-8'))):
                    usg = UserAndShareGroup.objects.create(user=request.user, share_group=ShareGroup.objects.get(
                        name=request.POST.get('group_name').encode('utf-8')))
                    usg.save()
            else:
                sg = ShareGroup.objects.create(name=request.POST.get('group_name'))
                sg.save()
                usg = UserAndShareGroup.objects.create(user=request.user, share_group=sg)
                usg.save()
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
def search(request, username):
    all_follower_list = []
    follow_status = ['Takip et', 'Takip ediliyor']
    if username != '':
        user_detail_list = UserDetails.objects.filter(user__username__contains=username)
        my_follower = Follow.objects.filter(follower=request.user).values('followed')
        print my_follower
        for user_detail in user_detail_list:
            photos_count = StatusPhotos.objects.filter(status__user=user_detail.user).count()
            follow_count = Follow.objects.filter(follower=user_detail.user).count()
            followed_list = UserDetails.objects.filter(
                user__in=Follow.objects.filter(followed=user_detail.user, follower__in=my_follower).values('follower'))
            is_followed = Follow.objects.filter(followed=user_detail.user, follower=request.user).exists()
            all_follower_list.append([user_detail, photos_count, follow_count, followed_list, is_followed])
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('search/index.html', locals(), context_instance=RequestContext(request))


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

    my_messages_list = Message.objects.filter(
        Q(send=user_active, to=request.user) | Q(to=user_active, send=request.user)).order_by('-date')
    if request.method == 'POST' and request.POST.get('content') != ''and request.POST.get('content') != ' ':
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
    args = {}
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
                user_auth.first_name = first_name
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
    else:
        form = SignupForm()
    args['form'] = form
    return render(request, 'signup.html', args)


def home_page(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/home/')
    dietician = UserDetails.objects.filter(type="4").count()
    style_consultant = UserDetails.objects.filter(type__in=[2, 3]).count()
    emaciated = UserDetails.objects.filter(type=1).count()

    return render_to_response('home_page.html', locals(), context_instance=RequestContext(request))


@csrf_exempt
@login_required
def home(request):
    status_all_list = []
    all_follower_list = []
    follow_status = ['Takip et', 'Takip ediliyor']
    try:
        if request.method == 'POST' and 'status' in request.POST and request.POST.get('status') != '':
            print "sa"
            status_content = request.POST.get('status').encode('utf-8').replace(" ", "").replace("\n", "")
            status_content = status_content.split('=')
            print status_content
            if str(status_content[0]) == 'kilo' and int(status_content[1]) / 1:
                new_status = Status.objects.create(type='WT', user=request.user,
                                                   content=status_content[1])
            else:
                new_status = Status.objects.create(type='ST', user=request.user,
                                                   content=request.POST.get('status'))
            new_status.save()
            print new_status.content
            for file_image in request.FILES.getlist('file'):
                status_photos = StatusPhotos.objects.create(status=new_status, photo=file_image)
                status_photos.save()
        if request.method == 'POST' and 'status_comment' in request.POST and request.POST.get('status_comment') != '':
            new_comment = StatusComment.objects.create(content=request.POST.get('comment'),
                                                       status_id=int(request.POST.get('status_comment')),
                                                       user=request.user)
            new_comment.save()
            return HttpResponseRedirect('/#' + str(request.POST.get('status_comment')))
        follow_list = Follow.objects.filter(follower=request.user).values('followed')
        status_list = Status.objects.filter(
            Q(user__in=follow_list, type='ST') | Q(user=request.user, type='ST')).order_by('-date')
        for status in status_list:
            user_detail = UserDetails.objects.get(user=status.user)
            status_photo_list = StatusPhotos.objects.filter(status=status)
            status_comment_list = StatusComment.objects.filter(status=status).order_by('date')
            comment_info = []
            for comment in status_comment_list:
                comment_user_detail = UserDetails.objects.get(user=comment.user)
                comment_info.append([comment, comment_user_detail])
            status_like_list = StatusLike.objects.filter(status=status)
            status_all_list.append([status, status_photo_list, comment_info, status_like_list, user_detail])
        the_person_who_following = UserDetails.objects.exclude(
            user__in=Follow.objects.filter(follower=request.user).values(
                'followed').order_by('?'))[:5]
        print the_person_who_following
        for follower in the_person_who_following:
            f_f_list = UserDetails.objects.filter(
                user__in=Follow.objects.filter(followed=follower.user).values('follower')).order_by('?')[:5]
            photos_count = StatusPhotos.objects.filter(status__user=follower.user).count()
            follow_count = Follow.objects.filter(followed=follower.user).count()
            if Follow.objects.filter(followed=follower, follower_id=request.user.id).exists():
                all_follower_list.append([follower, f_f_list, photos_count, follow_count, True])
            else:
                all_follower_list.append([follower, f_f_list, photos_count, follow_count, False])
    except Exception as e:
        print e
    return render_to_response('home.html', locals(), context_instance=RequestContext(request))


@login_required
@csrf_exempt
def edit_profile(request):
    try:
        user = User.objects.get(username=request.user.username)
        user_detail = UserDetails.objects.get(user=user)
    except Exception as e:
        print e
        return HttpResponseRedirect('/sorry/')

    form_user = UpdateProfileUser(instance=user)
    form_user_detail = UpdateProfileUserDetail(instance=user_detail)
    print request.POST
    if request.method == 'POST' and 'form_user' in request.POST:
        form_user = UpdateProfileUser(request.POST, instance=user)
        if form_user.is_valid():
            try:
                form_user.save()
                return HttpResponseRedirect('/profile_edit/')
            except Exception as e:
                print e
                return HttpResponseRedirect('/sorry/')
    if request.method == 'POST' and 'form_user_detail' in request.POST:
        form_user_detail = UpdateProfileUserDetail(request.POST, request.FILES, instance=user_detail)
        if form_user_detail.is_valid():
            try:
                form_user_detail.save()
                return HttpResponseRedirect('/profile_edit/')
            except Exception as e:
                print e
                return HttpResponseRedirect('/sorry/')
    return render_to_response('profile/profile_edit.html', locals(), context_instance=RequestContext(request))


@login_required
@csrf_exempt
def view_group(request, name):
    status_all_list = []
    name = name.encode("utf-8")
    if ShareGroup.objects.filter(name=name).exists() and name != '':
        try:
            sg = ShareGroup.objects.get(name=name)
            is_permission = UserAndShareGroup.objects.filter(user=request.user, share_group=sg).exists()
            if request.method == 'POST' and request.POST.get('status') and request.POST.get('status') != '':
                new_sg = ShareGroupStatus.objects.create(share_group=sg, user=request.user,
                                                         content=request.POST.get('status'))
                new_sg.save()
                print new_sg
                for file_image in request.FILES.getlist('file'):
                    sg_photos = ShareGroupStatusPhotos.objects.create(share_group_status=new_sg, photo=file_image)
                    sg_photos.save()
            if request.method == 'POST' and 'comment' in request.POST and request.POST.get('comment') != '':
                print request.POST.get('status_comment')
                new_comment = ShareGroupStatusComment.objects.create(content=request.POST.get('comment'),
                                                                     group_status_id=int(
                                                                         request.POST.get('status_comment')),
                                                                     user=request.user)
                new_comment.save()
                return HttpResponseRedirect('/group/' + name + '/#' + str(request.POST.get('status_comment')))
            status_list = ShareGroupStatus.objects.filter(share_group=sg).order_by('-date')
            for status in status_list:
                user_detail = UserDetails.objects.get(user=status.user)
                status_photo_list = ShareGroupStatusPhotos.objects.filter(share_group_status=status)
                status_comment_list = ShareGroupStatusComment.objects.filter(group_status=status).order_by('date')
                comment_info = []
                for comment in status_comment_list:
                    comment_user_detail = UserDetails.objects.get(user=comment.user)
                    comment_info.append([comment, comment_user_detail])
                status_like_list = ShareGroupStatusLike.objects.filter(status=status)
                status_all_list.append([status, status_photo_list, comment_info, status_like_list, user_detail])
        except Exception as e:
            print e
    else:
        return HttpResponseRedirect('/sorry/')
    return render_to_response('view_group.html', locals(), context_instance=RequestContext(request))


def leave_group(request, name):
    UserAndShareGroup.objects.filter(user=request.user, share_group=ShareGroup.objects.get(name=name)).delete()
    return HttpResponseRedirect('/profile/about/' + request.user.username + '/#group')


def new_blog(request):
    form = NewBlog(initial={'user': request.user})
    print request.POST
    if request.method == 'POST':
        form = NewBlog(request.POST, request.FILES, initial={'user': request.user})
        if form.is_valid():
            try:
                form.save()
                print form
                return HttpResponseRedirect('/profile/about/' + str(request.user.username) + '/')
            except Exception as e:
                print e
                return HttpResponseRedirect('/sorry/')
    return render_to_response('new_blog.html', locals(), context_instance=RequestContext(request))


def edit_blog(request, bid):
    print "sa"
    blog = Blog.objects.get(id=int(bid))
    form = NewBlog(instance=blog)
    print request.POST
    if request.method == 'POST':
        form = NewBlog(request.POST, request.FILES, instance=blog)
        if form.is_valid():
            try:
                form.save()
                print form
                return HttpResponseRedirect('/profile/about/' + str(request.user.username) + '/')
            except Exception as e:
                print e
                return HttpResponseRedirect('/sorry/')
    return render_to_response('new_blog.html', locals(), context_instance=RequestContext(request))


def view_blog(request, bid):
    blog = Blog.objects.get(id=int(bid))
    follow_status = ['Takip et', 'Takip ediliyor']
    user_detail = UserDetails.objects.get(user=blog.user)
    user = User.objects.get(id=blog.user.id)
    is_followed_by_me = Follow.objects.filter(followed=user, follower=request.user)
    user_detail = UserDetails.objects.get(user=user)
    follower_list_cover = UserDetails.objects.filter(
        user__in=Follow.objects.filter(followed=user).values('follower').order_by('?')[:9])
    return render_to_response('view_blog.html', locals(), context_instance=RequestContext(request))


def delete_blog(request, bid):
    Blog.objects.get(id=int(bid)).delete()
    return HttpResponseRedirect('/profile/about/' + request.user.username)


def delete_status(request, sid):
    Status.objects.get(id=sid).delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])


def delete_group_status(request, gsid):
    ShareGroupStatus.objects.get(id=gsid).delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])


def delete_status_comment(request, sid):
    StatusComment.objects.get(id=sid).delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])


def delete_group_status_comment(request, gsid):
    ShareGroupStatusComment.objects.get(id=gsid).delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])


def remember_password(request):
    user = User.objects.get(id=4)
    password = User.objects.make_random_password()
    print password
    user.set_password(password)
    user.save()
    if request.POST and User.objects.filter(email=request.POST.get('email')).exists():
        mail = request.POST.get('email')
        user = User.objects.get(email=mail)
        print user
        password = User.objects.make_random_password()
        print password
        user.set_password(password)
        user.save()
        mailgun_operator = mailgun()
        message = 'merhaba ' + str(user.username) + ' şifre yenileme talebin sonucunda, şifren aşağıdaki gibi değiştirilmiştir' \
                                                    ' \n yeni şifre = ' + str(password)
        mailgun_operator.send_mail(mail, message, 'Şifre Hatırlatma')
        return HttpResponseRedirect('/accounts/login/')
    return render_to_response('remember_password.html', locals(), context_instance=RequestContext(request))

