from django import forms
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

__author__ = 'bamsi'


class SignupForm(forms.ModelForm):
    email = forms.EmailField(required=True)
    username = forms.CharField(required=True)
    password = forms.CharField(required=True)
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def save(self, commit=True):
        user = super(signup_form, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']

        if commit:
            user.save()

        return user

    def clean_password(self):
        data = make_password(self.cleaned_data['password'])
        return data