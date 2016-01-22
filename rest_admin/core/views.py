from django.views.generic import TemplateView
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser

from .sites import site
from .serializers import AdminAppSerializer


class AppsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """List of Admin apps with nested ModelAdmin instances"""
    serializer_class = AdminAppSerializer
    permission_classes = (IsAdminUser, )

    def get_queryset(self):
        return site.get_apps(self.request)


class AdminIndexView(TemplateView):
    """Index view rendering base React HTML template by default"""
    template_name = 'rest_admin/index.html'
