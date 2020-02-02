from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from emails.models import EmailLeads
from emails.serializers import EmailSerializer

class EmailViewSet(viewsets.ModelViewSet):
	permission_classes = [
		permissions.IsAuthenticated
	]
	serializer_class = EmailSerializer

	def get_queryset(self):
		return EmailLeads.objects.filter(owner=self.request.user)

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_email(request, **kwargs):
	if request.method == 'POST':
		sender = request.user.email
		email = request.data['email']
		subject = request.data['subject']
		text = request.data['message']
		email_list = [email]
		send_mail(subject, text, sender, email_list, fail_silently=False)
		return Response(status=status.HTTP_200_OK)