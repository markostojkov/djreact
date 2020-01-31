from django.urls import path, include

from rest_framework import routers

from emails.api import EmailViewSet, send_email


router = routers.DefaultRouter()
router.register('api/emails', EmailViewSet, 'emails')

urlpatterns = [
	path('api/emails/send-email',send_email, name='send_email')
]

urlpatterns += router.urls