from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('politics/', politics, name='politics'),
    path('homeAjaxView/', homeAjaxView, name='homeAjaxViewUrl'),
    path('ajaxImageFind/', imageFind, name='ajaxImageFind'),
    path('canvaWidgetSetImageAjax/', canvaWidgetSetImageAjax, name='canvaWidgetSetImageAjax'),
    path('key/<str:key>/', codeJs, name='home-swipeKey'),
    path('key/<str:key>/<str:params>', codeJsGet, name='home-swipeKeyGet'),
    path('previewWidget/key<str:key>/', PreviewWidget, name='home-PreviewWidget'),
    path('delted/pk<str:pk>/', DeltedWidget, name='home-DeltedWidget'),
    path('css/', codeCss, name='home-swipeKey'),
    path('edit/id<int:pk>', widgetEditView, name='widget-edit'),
    path('status/id<int:pk>/', StatusChangeWidget, name='widget-changeStatus'),
    path('delted-link/id<int:pk>/', DeltedLinkWidget, name='widget-link-delted'),
    path('status-link/id<int:pk>/', StatusChangeLinkWidget, name='widget-link-changeStatus'),
    path('create', createEditView, name='widget-create'),
]
