from django.urls import reverse_lazy
from django.views import generic
from django.shortcuts import render, get_object_or_404, redirect
from loguru import logger
from home.models import testLead, widgetStatistics
from .forms import CustomUserChangeForm
from .models import CustomUser
from django.contrib.auth.decorators import login_required

@login_required
def user_profile_edt(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            logger.info(request.POST)
            form.save()
    else:
        form = CustomUserChangeForm(request.POST or None, instance=request.user)

    context = {
        'title': 'Редактор профиля',
        'form': form,
        'widgetCount': testLead.objects.filter(user = request.user).count,
    } 
    return render(request, 'users-lk/profile_edit.html', context)
@login_required
def user_pay(request):
    context = {
        'title': 'Биллинг',
        'widgetCount': testLead.objects.filter(user = request.user).count,
    }
    return render(request, 'users-lk/pay.html', context)

@login_required
def userLk(request):
    context = {
        'title': 'Личный кабинет',
        'widget': testLead.objects.filter(user = request.user),
        'widgetCount': testLead.objects.filter(user = request.user).count,
    }

    return render(request, 'users-lk/index.html', context)