from django.db import models
from django import forms

# Create your models here.

from fields import PickledObjectField

class Bubbles (models.Model):
  
  slug = models.SlugField()
  name = models.CharField(null=True, max_length=64)
  bubbles = PickledObjectField()

class BubblesForm (forms.Form):
  bubbles = forms.CharField()

