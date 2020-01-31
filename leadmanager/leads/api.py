from rest_framework import viewsets, permissions
from leads.models import Lead
from leads.serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
	permission_classes = [
		permissions.IsAuthenticated
	]
	serializer_class = LeadSerializer

	def get_queryset(self):
		return Lead.objects.filter(owner=self.request.user)

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)