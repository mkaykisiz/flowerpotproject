from django import forms
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from flowerpot.models import UserDetails, Blog

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
        user = super(SignupForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']

        if commit:
            user.save()

        return user

    def clean_password(self):
        data = make_password(self.cleaned_data['password'])
        return data


class UpdateProfileUser(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'
        widgets = {'last_login': forms.HiddenInput,
                   'is_superuser': forms.HiddenInput,
                   'is_staff': forms.HiddenInput,
                   'date_joined': forms.HiddenInput,
                   'is_active': forms.HiddenInput,
                   'groups': forms.HiddenInput,
                   'user_permissions': forms.HiddenInput,
                   'password': forms.PasswordInput,
                   }

    def clean_password(self):
        data = make_password(self.cleaned_data['password'])
        return data


class UpdateProfileUserDetail(forms.ModelForm):
    class Meta:
        model = UserDetails
        widgets = {'user': forms.HiddenInput,
                   'date': forms.HiddenInput
                   }
        fields = '__all__'


class NewBlog(forms.ModelForm):
    class Meta:
        model = Blog
        widgets = {'user': forms.HiddenInput,
                   'content': forms.Textarea(attrs={'cols': 80, 'rows': 7})}
        fields = '__all__'