from django.db import models
from django.contrib.auth.models import User


class EmailLeads(models.Model):
	owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	email = models.EmailField(max_length=100)
	name = models.CharField(max_length=50)
	phone_number = models.CharField(max_length=50)

