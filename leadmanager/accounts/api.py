from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
	serializer_class = RegisterSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response({
		"user": UserSerializer(user, context=self.get_serializer_context()).data,
		"token": AuthToken.objects.create(user)[1]
		})

# Login API
class LoginAPI(generics.GenericAPIView):
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		return Response({
		"user": UserSerializer(user, context=self.get_serializer_context()).data,
		"token": AuthToken.objects.create(user)[1]
		})

# Get User API
class UserAPI(generics.RetrieveAPIView):
	permission_classes = [
	permissions.IsAuthenticated,
	]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user

	def post(self, request):
		self.object = self.get_object()
		serializer = self.get_serializer(instance=self.object, data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data)


class ChangePasswordView(generics.UpdateAPIView):
	serializer_class = ChangePasswordSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_object(self, queryset=None):
		obj = self.request.user
		return obj

	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			if not self.object.check_password(serializer.data.get("old_password")):
				return Response({"oldPassword": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)
			self.object.set_password(serializer.data.get("new_password"))
			self.object.save()
			response = {
				'status': 'success',
				'code': status.HTTP_200_OK,
				'message': 'Password updated successfully',
				'data': []
			}

			return Response(response)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)