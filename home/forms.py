from django import forms
from .models import testLead, urlLead


class leadEmail(forms.Form):
    email = forms.EmailField(label="Введите Ваш email", max_length = 250, widget=forms.EmailInput(
        attrs={'placeholder':'E-mail','id': 'inputEmailLead', 'class': 'form-control-lg'}))


class WidgetChangeForm(forms.ModelForm):
    class Meta:
        model = testLead
        fields = ('title','openTime','siteUrlBase', 'keyWords', 'image', )

    def __init__(self, *args, **kwargs):
        super(WidgetChangeForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'


class LinkChangeForm(forms.ModelForm):
    class Meta:
        model = urlLead
        fields = ('url','type','keyWords', )

    def __init__(self, *args, **kwargs):
        super(LinkChangeForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'