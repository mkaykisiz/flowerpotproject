import re
from django.utils.safestring import mark_safe

__author__ = 'mehmet'
from django import template

register = template.Library()


@register.filter
def get_discount(d, total):
    return d*100/total

@register.filter
def content(value):
    size = (180-len(value))
    if 0 < size:
        return str(value)[:180]
    else:
        return str(value)[:180] + "..."


@register.filter
def title(value):
    size = (40-len(value))
    if 0 < size:
        return str(value)[:40]
    else:
        return str(value)[:40] + "..."


class_re = re.compile(r'(?<=class=["\'])(.*)(?=["\'])')


@register.filter
def add_class(value, css_class):
    string = unicode(value)
    match = class_re.search(string)
    if match:
        m = re.search(r'^%s$|^%s\s|\s%s\s|\s%s$' % (css_class, css_class,
                                                    css_class, css_class),
                                                    match.group(1))
        print match.group(1)
        if not m:
            return mark_safe(class_re.sub(match.group(1) + " " + css_class,
                                          string))
    else:
        return mark_safe(string.replace('>', ' class="%s">' % css_class))
    return value


@register.filter
def get_range(value):
    return range(value)