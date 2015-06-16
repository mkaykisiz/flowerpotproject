from django.db.models.query_utils import Q
from flowerpot.models import *

__author__ = 'bamsi'


def base(request):
    global user_detail
    if request.user.id is not None:
        user_detail = UserDetails.objects.get(user_id=request.user.id)
        send = Message.objects.filter(send_id=request.user.id).distinct(
            'to').values_list("to", flat=True)
        to = Message.objects.filter(to_id=request.user.id).distinct(
            'send').values_list("send", flat=True)
        message_list = UserDetails.objects.filter(Q(user_id__in=send) | Q(user_id__in=to))
        return {
            'active_user': user_detail,
            'message_list': message_list
        }
    else:
        return {
        }