from django import forms
from .models import testLead


class leadEmail(forms.Form):
    email = forms.EmailField(label="Введите Ваш email", max_length = 250, widget=forms.EmailInput(
        attrs={'placeholder':'E-mail','id': 'inputEmailLead', 'class': 'form-control-lg'}))


class WidgetChangeForm(forms.ModelForm):
    class Meta:
        model = testLead
        fields = ('title','openTime','siteUrlBase','siteUrlUp', 'keyWords', 'image', )

    def __init__(self, *args, **kwargs):
        super(WidgetChangeForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'