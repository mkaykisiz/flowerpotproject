from django.contrib import admin

# Register your models here.
from django.db.models.loading import get_models, get_app

for model in get_models(get_app('flowerpot')):
    admin.site.register(model)