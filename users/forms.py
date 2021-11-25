from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from django.core.exceptions import NON_FIELD_ERRORS
from django.forms import ModelForm
from .models import CustomUser


class Loginform(forms.Form):
    email = forms.EmailField(label="Введите Ваш email", max_length = 250, widget=forms.EmailInput(
        attrs={'placeholder':'E-mail','id': 'inputEmail', 'class': 'form-control'}))
    password = forms.CharField(label="Пароль", widget=forms.PasswordInput(
        attrs={'placeholder':'Пароль', 'id': 'inputPassword', 'class': 'form-control'}))
    

class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email',)


class CustomUserChangeForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ('name','surname','phone','email', 'photo')

    def __init__(self, *args, **kwargs):
        super(CustomUserChangeForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'