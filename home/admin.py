from django.contrib import admin
from .models import *

@admin.register(testLead)
class testLeadAdmin(admin.ModelAdmin):
	list_display = ('id', 'siteUrlBase', 'key', 'dateStart', 'dateStop', 'status')
	list_display_links = ('id', 'siteUrlBase', 'key')
	search_fields = ('siteUrlBase', 'siteUrlUp', 'dateStart', 'key')
	list_filter = ['dateStart', 'dateStop', 'status']
	verbose_name_plural = 'Модули'

admin.site.register(widgetStatistics)
