from rest_framework import serializers
from emails.models import EmailLeads

class EmailSerializer(serializers.ModelSerializer):
	class Meta:
		model = EmailLeads
		fields = '__all__'