from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

def testLeadCreateMail(email, password):
    subject ='Виджет SwipeMe успешно создан!'
    context_mail = {
        'user_email': email,
        'user_password': password,
        'user_key': None,
        'user_loginUrl': None,
    }
    msg = render_to_string('mail/createTestLead.html', context_mail)
    send_mail(subject, msg, settings.EMAIL_HOST_USER, [email,], html_message=msg)