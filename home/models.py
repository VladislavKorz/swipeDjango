from django.db.models.signals import pre_save
from django.dispatch import receiver

from django.urls import reverse
from django.db import models
from users.models import CustomUser
import requests
import random
import datetime
import urllib
import os

baseUrl = 'http://swipe-me.ru'
baseUrl1 = 'http://127.0.0.1:8000'

def uniqueKeyGenerator():
    chars = list('.-_abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    random.shuffle(chars)
    pasw = ''.join([random.choice(chars) for x in range(random.randint(15,30))])
    if testLead.objects.filter(key = pasw).count() == 0:
        return pasw
    else:
        uniqueKeyGenerator()

class widgetStatistics(models.Model):
    show = models.IntegerField(verbose_name="Показы", default=0)
    clickUP = models.IntegerField(verbose_name="Свайп вверх", default=0)
    clickDown = models.IntegerField(verbose_name="Свайп вниз", default=0)
    staticCreate = models.DateTimeField(verbose_name="Дата создания", auto_now=True, auto_now_add=False)
    staticUpdate = models.DateTimeField(verbose_name="Дата последнего изменения", auto_now=False, auto_now_add=True)

    def __unicode__(self):
        return str(self.pk)

    def __str__(self):
        return str(self.pk) + ' ' + str(self.show)
    
    class Meta:
        verbose_name_plural='Статистика виджетов'
        verbose_name='Статистика виджета'

class testLead(models.Model):
    
    WIDGET_STATUS_CHOICES = [
        (0, 'В работе'),
        (1, 'Отключен'),
        (2, 'Ожидает опалаты'),
        ]
    statick = models.ForeignKey(widgetStatistics, verbose_name='Статистика', on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(CustomUser, verbose_name="Владелец виджета", on_delete=models.CASCADE, null=True, blank=True)
    key =  models.CharField(max_length=70, default=uniqueKeyGenerator, verbose_name='Уникальный ключ', unique=True)
    title = models.CharField(verbose_name='Текст кнопки', max_length=120, default='Смахни вверх')
    status = models.IntegerField(verbose_name='Статус виджета', choices=WIDGET_STATUS_CHOICES, default=0,)
    openTime = models.IntegerField(verbose_name='Открывать через ... секунд', default=5, help_text='при 0 открывается сразу')
    siteUrlBase = models.URLField(verbose_name='Базовый сайт виджета', max_length=200, default='')
    siteUrlUp = models.URLField(verbose_name='Сайт свайп вверх', max_length=450, default='')
    siteUrlDown = models.URLField(verbose_name='Сайт свай вниз', max_length=120, blank=True, default='')
    siteUrlLeft = models.URLField(verbose_name='Сайт свайп влево', max_length=120, blank=True, default='')
    siteUrlRight = models.URLField(verbose_name='Сайт свайп вправо', max_length=120, blank=True, default='')
    keyWords = models.CharField(verbose_name='Текст оффера', max_length=120, blank=True, help_text='Оставьте поле пустым, если текст есть на картнике')
    image = models.ImageField(verbose_name='Картинка банера', upload_to='image/banner/lead/%Y-%m', blank=True)
    imageUrl = models.URLField("Ссылка на картинку", max_length=1000, blank=True)
    imageCanvaID =  models.CharField(max_length=15, verbose_name='Canva ID', blank=True)
    dateStart = models.DateTimeField(verbose_name='Дата начала', auto_now=True)
    dateStop = models.DateTimeField(verbose_name='Дата остановки', default=datetime.datetime.now() + datetime.timedelta(days=7))

    def __unicode__(self):
        return str(self.pk) + ' ' + str(self.siteUrlBase)
    def __str__(self):
        return str(self.pk) + ' ' + str(self.siteUrlBase)
    
    def get_absolute_url(self):
        return reverse('home-swipeKey', args=[str(self.key)])

    def get_absolute_image(self):
        if self.image:
            return baseUrl + self.image.url
        elif self.imageUrl:
            return self.imageUrl
        else:
            return 'https://motionarray.imgix.net/preview-73841-2MhzgDwKQR_0000.jpg'

    def get_status(self):
        return self.WIDGET_STATUS_CHOICES[self.status][1]


    class Meta:
        verbose_name_plural='Тестовые лиды'
        verbose_name='Тестовый лид'
        ordering=['-dateStart', 'siteUrlBase']


# REMOTE_ADDR


class partners(models.Model):
    pass
    # logo
    # regal
    # pod-domen
    # new gif left