from django.contrib import admin
from .models import *


class LinkCategoryInline(admin.TabularInline):
    fk_name = 'lead'
    model = urlLead
    extra = 1

@admin.register(testLead)
class testLeadAdmin(admin.ModelAdmin):
	list_display = ('id', 'siteUrlBase', 'key', 'dateStart', 'dateStop', 'status')
	list_display_links = ('id', 'siteUrlBase', 'key')
	search_fields = ('siteUrlBase', 'siteUrlUp', 'dateStart', 'key')
	list_filter = ['dateStart', 'dateStop', 'status']
	inlines = [
        LinkCategoryInline,
    ]
	verbose_name_plural = 'Модули'


	


admin.site.register(widgetStatistics)
