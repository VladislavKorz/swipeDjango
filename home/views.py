from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required, user_passes_test
from django.template import loader
from datetime import datetime
import random
from users.models import CustomUser
from .models import *
from .forms import *
from translate import Translator
from langdetect import detect
from loguru import logger
from pyunsplash import PyUnsplash
from django.template import RequestContext
from django.utils import timezone
from users.forms import CustomUserCreationForm, Loginform
import json
import difflib
from .mail import testLeadCreateMail
from django.views.decorators.csrf import csrf_exempt,csrf_protect #Add this

from django.core.files import File
from urllib.request import urlopen
from tempfile import NamedTemporaryFile

def translate(word, from_l='russian', to_l='english'):
    translator = Translator(from_lang=from_l, to_lang=to_l)
    word = translator.translate(word)
    return word

def imageFind(request):
    if request.is_ajax():
        searchKey = request.POST.get('searchKey')
        pageS = int(request.POST.get('page'))
        quantity = int(request.POST.get('quantity'))
        searchKeyTr = translate(searchKey)
        if not 'MYMEMORY WARNING' in translate(searchKey):
            searchKey = searchKeyTr
        api_key = '8Ds9WVl3pXfRGvLd4Jw9HXx268zC17iQ_Tgup-EAA0M'
        py_un = PyUnsplash(api_key=api_key)
        search = py_un.search(type_='photos', query=searchKey,
                            page=int(pageS), per_page=quantity)
        imageDir = {}
        for i in search.entries:
            imageDir.update({i.body.get('urls').get(
                'regular'): i.body.get('description')})
        return HttpResponse(json.dumps({'type': 'image', 'len': len(imageDir), 'image': imageDir}))

@csrf_exempt
def homeAjaxView(request):
    if request.is_ajax():
        if request.method == 'POST':
            if request.POST.get('formStat') == 'leadFormWidget':
                try:
                    lead = testLead.objects.filter(siteUrlBase=request.POST.get('value'))[0]
                    if lead.user != None:
                        context= ({
                            'type': 'leadFormWidget',
                            'status': 'error',
                            'error': "Такой сайт уже зарегистрирован, водите в личный кабинет, что бы его редактировать.",
                        })
                        return HttpResponse(json.dumps(context))
                except:
                    pass
                context = {
                    'type': 'leadFormWidget',
                }
                if request.POST.get('step') == '1':
                    lead = testLead.objects.get_or_create(siteUrlBase=request.POST.get('value'))[0]
                    logger.info('Работаем')
                elif request.POST.get('step') == '2':
                    lead = testLead.objects.get(key = request.POST.get('key'))
                    lead.imageUrl = request.POST.get('value')
                    lead.save()
                elif request.POST.get('step') == '3':
                    lead = testLead.objects.get(key = request.POST.get('key'))
                    lead.keyWords = request.POST.get('value')
                    lead.save()
                elif request.POST.get('step') == '4':
                    lead = testLead.objects.get(key = request.POST.get('key'))
                    lead.siteUrlUp = request.POST.get('value')
                    lead.save()
                elif request.POST.get('step') == '6':
                    lead = testLead.objects.get(key = request.POST.get('key'))
                    ad = request.POST.get('value')
                    if CustomUser.objects.filter(email = ad).count() == 0:
                        chars = list('.-_abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
                        random.shuffle(chars)
                        pasw = ''.join([random.choice(chars) for x in range(random.randint(6,8))])
                        user = CustomUser.objects.create_user(email=ad, password=pasw)
                        lead.user = user
                        lead.save()
                        testLeadCreateMail(ad, pasw)
                        user = authenticate(request, email=ad, password=pasw)
                        if user is not None:
                            login(request, user)
                    else:
                        context.update({
                            'code': "Пользователь с таким email уже существует. Войдите в свой личный кабинет или напишите нам на почту, для восстановления доступа.."
                        })
                        return HttpResponse(json.dumps(context))
                    # except:
                    #     logger.error('Письмо не отправлено')
                elif request.POST.get('key') != " ":
                    lead = testLead.objects.get(key = request.POST.get('key'))
                

                logger.info(f"Шаг: {request.POST.get('step')} Значение: {request.POST.get('value')}")

                try:
                    homeUrl = request.scheme + '://' + request.META['HTTP_HOST']
                    urlCss = homeUrl + '/static/css/leadTest.css'
                    urlJs = homeUrl + reverse('home-swipeKey', args=[str(lead.key)])
                    code = "<link rel='stylesheet' href='" + urlCss + "'>\n<div id='swipeWrapper-1ieq2r'></div>\n<script src='" + urlJs + "' content_type='application/javascript'></script>"
                    context.update({
                        'previewUrl': homeUrl + reverse('home-PreviewWidget', args=[lead.key]),
                        'key': lead.key,
                    })
                except Exception as exc:
                    code = "Произошла ошибка, наша команда уже в курсе и мчится искать проблему, пока пожалуйста, попробуйте еще раз!"
                    logger.error(f"Шаг: {request.POST.get('step')} Значение: {request.POST.get('value')}")
                    logger.error(f"Ошибка: {exc}")
                
                context.update({
                    'code':code,
                })
                
                return HttpResponse(json.dumps(context))
                
                # resultDict = {}
                # data = json.loads(request.POST.get('form'))
                # for i in data:
                #     resultDict.update({i.get('name'): i.get('value')})
                # logger.debug(lead[0])
                # logger.debug(resultDict)
                # lead[0].imageUrl = resultDict.get('imageUrl')
                # lead[0].keyWords = resultDict.get('keyWordsOffer')
                # lead[0].siteUrlUp = resultDict.get('msgUrl')
                # lead[0].openTime = resultDict.get('numberOpen')
                # lead[0].save()
    context = {
        'readyСode':'<span>ШАГ 6:</span> ВСТАВЬТЕ ГОТОВЫЙ КОД СЕБЕ НА САЙТ ДО ТЕГА&lt;/head&gt;<br>'
    }
    return HttpResponse(context)

def home(request):
    context = {
        'title': 'swipeMe',
        'descriptions': 'swipeMe',
        'keywords': 'swipeMe',
    }

    if not request.user.is_authenticated:
        formLogin = Loginform(request.POST or None)
        formEmail =  leadEmail(request.POST or None)
        if formLogin.is_valid():
            uservalue= formLogin.cleaned_data.get("email")
            passwordvalue= formLogin.cleaned_data.get("password")
            logger.info(uservalue)
            logger.info(passwordvalue)
            user = authenticate(username=uservalue, password=passwordvalue)
            if user is not None:
                login(request, user)
        if formEmail.is_valid():
            logger.info(formLogin.cleaned_data.get("email"))
        context.update({'Loginform': formLogin, 'errorUserLogin': 'Неправильная комбинация имени пользователя и пароля'})
        context.update({'formEmail': formEmail})
    return render(request, 'home/home-new.html', context)


def politics(request):
    context = {
        'title': 'swipeMe',
        'descriptions': 'swipeMe',
        'keywords': 'swipeMe',
    }

    return render(request, 'home/politics.html', context)

def codeJs(request, key):
    code = testLead.objects.get(key = key)

    if code.dateStop > timezone.now():
        if code.status == 0:
            context = {
                'inst_url': code.url_links.filter(type=2, status=True),
                'baseUrl': baseUrl,
                'code': code,
            }
            return render(request, 'home/leadTest.js', context, content_type="application/x-javascript")
        else:
            return HttpResponse('Виджет отключен')
    else:
        return HttpResponse('Время использования виджета истекло')

from django.http import JsonResponse

def codeJsGet(request, key, params):
    if not request.META.get("HTTP_HOST") in ['127.0.0.1:8000', 'swipe-me.ru']:
        code = testLead.objects.get(key = key)
        if code.dateStop > timezone.now():
            logger.info(params)
            if params == 'open':
                code.statick.show += 1
            elif params == 'swipeUP':
                code.statick.clickUP += 1
            elif params == 'close':
                code.statick.clickDown += 1
            code.statick.save()
            return JsonResponse({'status': str(params)})
        else:
            return JsonResponse({'status':'Время использования виджета истекло'})
    else:
        return JsonResponse({'status':'Локальный запрос'})

def codeCss(request):
    context = {
        'code': 'code',
    }
    return render(request, 'home/leadTest.css', context, content_type="stylesheet")

def PreviewWidget(request, key, status=0):
    if testLead.objects.get(key=key).dateStop > timezone.now():
        homeUrl = request.scheme + '://' + request.META['HTTP_HOST']
        urlCss = homeUrl + '/static/css/leadTest.css'
        urlJs = homeUrl + reverse('home-swipeKey', args=[str(key)])
        code = "<link rel='stylesheet' href='" + urlCss + "'>\n<div id='swipeWrapper-1ieq2r'></div>\n<script src='" + urlJs + "' content_type='text/javascript'></script>"
    else:
        code = '<h3 class="text-center p-5 m-5">Срок использования виджета истек, пожалуйста продлите его!</h3>'
    context = {
        'code': code,
        'url': homeUrl+reverse('home-PreviewWidget', args=[key]),
    }
    return render(request, 'home/demoWidget.html', context)

def DeltedWidget(request, pk):
    widget = get_object_or_404(testLead, pk=pk, user=request.user)
    widget.delete()
    return redirect('users-lk')

def DeltedLinkWidget(request, pk):
    link = get_object_or_404(urlLead, pk=pk, lead__user=request.user)
    link.delete()
    return redirect('widget-edit', link.lead.pk)

def StatusChangeLinkWidget(request, pk):
    link = get_object_or_404(urlLead, pk=pk, lead__user=request.user)
    if link.status:
        link.status = False
    else:
        link.status = True
    link.save()
    return redirect('widget-edit', link.lead.pk)

def StatusChangeWidget(request, pk):
    widget = get_object_or_404(testLead, pk=pk, user=request.user)
    if widget.status == 0:
        widget.status = 1 
        widget.save()
    elif widget.status == 1:
        widget.status = 0
        widget.save()
    return redirect('users-lk')

def widgetEditView(request, pk):
    widget = get_object_or_404(testLead, pk=pk, user=request.user)
    logger.info(request)
    if request.method == 'POST':
        logger.info(request.POST)
        form = WidgetChangeForm(request.POST, request.FILES, instance=widget)
        if form.is_valid():
            logger.info(request.POST)
            form.save()
    else:
        form = WidgetChangeForm(request.POST or None, instance=widget)

    context = {
        'title': 'Редактор виджета #' + str(pk),
        'form': form,
        'widget': widget
    } 
    return render(request, 'home/widget_edit.html', context)


@csrf_exempt
def canvaWidgetSetImageAjax(request):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                widget = testLead.objects.get(pk=request.POST.get('widgetId'), user=request.user)
                widget.imageCanvaID = request.POST.get('designId')
                
                url = request.POST.get('exportUrl')
                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(urlopen(url).read())
                img_temp.flush()
                widget.image.save(f"{widget.pk}_{widget.imageCanvaID}", File(img_temp))
                widget.save()
                
                context = {
                    'status': 'OK',
                    'imgUrl': str(widget.image.url)
                }
                return HttpResponse(json.dumps(context))
            except:
                return HttpResponse(json.dumps({'status':'error', 'msg':'Произошла ошибка, пожалуйста попробуйте еще раз'}))


def createEditView(request):
    if request.method == 'POST':
        form = WidgetChangeForm(request.POST, request.FILES)
        logger.info(form)
        if form.is_valid():
            widget = form.save(commit=False)
            widget.user = request.user
            widget.save()
        return redirect('widget-edit', pk=widget.pk)
    else:
        form = WidgetChangeForm(request.POST or None)

    context = {
        'title': 'Создание виджета',
        'form': form,
    } 
    return render(request, 'home/widget_edit.html', context)