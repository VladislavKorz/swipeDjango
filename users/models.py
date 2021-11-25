from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(verbose_name='Телефон', max_length=12, blank=True)
    name = models.CharField("Имя", max_length=50, blank=True)
    surname = models.CharField("Фамилия", max_length=50, blank=True)
    photo = models.ImageField("Изображение профиля", upload_to='users/image/', blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
        
    def __unicode__(self):
        return str(self.pk) + ' ' + str(self.email)