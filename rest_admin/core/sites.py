# -*- coding: utf-8 -*-
"""
This module does not contain any Django models.
Instead it contains "model" part of MVC for rest_admin.
"""

from django.apps import apps
from django.contrib.admin import sites as django_admin_sites
from django.utils.text import capfirst


class ModelAdminWrapper(object):
    """Read-only wrapper around ModelAdmin instance adding `perms` property"""

    def __init__(self, request, wrapped_obj):
        self._request = request
        self._wrapped_obj = wrapped_obj
        self._perms = None
        self._module_perms = None

    @property
    def perms(self):
        if not self._perms:
            self._perms = self._wrapped_obj.get_model_perms(self._request)
        return self._perms

    @property
    def module_perms(self):
        if not self._module_perms:
            self._module_perms = self._wrapped_obj.has_module_permission(self._request)
        return self._module_perms

    @property
    def name(self):
        return capfirst(self._wrapped_obj.model._meta.verbose_name_plural)

    @property
    def object_name(self):
        return self._wrapped_obj.model._meta.object_name

    @property
    def model_name(self):
        return self._wrapped_obj.model._meta.model_name


class DjangoApp(object):
    """Representation of Django application to be used in admin"""

    def __init__(self, name, app_label, models=None):
        self.name = name
        self.app_label = app_label
        self._models = models or []

    def add_model(self, model):
        self._models.append(model)

    @property
    def models(self):
        return sorted(
            filter(lambda itm: itm.module_perms and itm.perms, self._models),
            key=lambda itm: itm.name
        )

    @property
    def has_module_perms(self):
        return any(filter(lambda itm: itm.module_perms, self._models))


class RestAdminSite(object):
    """Django REST Admin site"""

    def __init__(self, admin_site, name='rest_admin'):
        self.name = name
        self.admin_site = admin_site

    def get_apps(self, request):
        """Returns list of apps"""
        app_dict = {}
        for model, model_admin in self.admin_site._registry.items():
            app_label = model._meta.app_label
            if app_label not in app_dict:
                app_dict[app_label] = DjangoApp(
                    name=apps.get_app_config(app_label).verbose_name,
                    app_label=app_label
                )
            app_dict[app_label].add_model(ModelAdminWrapper(request, model_admin))

        return sorted(filter(lambda itm: itm.models, app_dict.values()), key=lambda itm: itm.name)

    def get_api_urls(self):
        from .views import AppsViewSet
        from rest_framework import routers

        router = routers.DefaultRouter()
        router.register('apps', AppsViewSet, 'apps')

        return router.urls

        # # Since this module gets imported in the application's root package,
        # # it cannot import models from other applications at the module level,
        # # and django.contrib.contenttypes.views imports ContentType.
        # from django.contrib.contenttypes import views as contenttype_views

        # if settings.DEBUG:
        #     self.check_dependencies()

        # def wrap(view, cacheable=False):
        #     def wrapper(*args, **kwargs):
        #         return self.admin_view(view, cacheable)(*args, **kwargs)
        #     return update_wrapper(wrapper, view)

        # # Admin-site-wide views.
        # urlpatterns = [
        #     # url(r'^$', wrap(self.index), name='index'),
        #     # url(r'^login/$', self.login, name='login'),
        #     # url(r'^logout/$', wrap(self.logout), name='logout'),
        #     # url(r'^password_change/$', wrap(self.password_change, cacheable=True), name='password_change'),
        #     # url(r'^password_change/done/$', wrap(self.password_change_done, cacheable=True),
        #     #     name='password_change_done'),
        #     # url(r'^jsi18n/$', wrap(self.i18n_javascript, cacheable=True), name='jsi18n'),
        #     # url(r'^r/(?P<content_type_id>\d+)/(?P<object_id>.+)/$', wrap(contenttype_views.shortcut),
        #     #     name='view_on_site'),
        # ]

        # # Add in each model's views, and create a list of valid URLS for the
        # # app_index
        # valid_app_labels = []
        # for model, model_admin in six.iteritems(self._registry):
        #     urlpatterns += [
        #         url(r'^%s/%s/' % (model._meta.app_label, model._meta.model_name), include(model_admin.urls)),
        #     ]
        #     if model._meta.app_label not in valid_app_labels:
        #         valid_app_labels.append(model._meta.app_label)

        # # If there were ModelAdmins registered, we should have a list of app
        # # labels for which we need to allow access to the app_index view,
        # if valid_app_labels:
        #     regex = r'^(?P<app_label>' + '|'.join(valid_app_labels) + ')/$'
        #     urlpatterns += [
        #         url(regex, wrap(self.app_index), name='app_list'),
        #     ]

        # return urlpatterns

    def get_schema_urls(self):
        from django.conf.urls import url
        from django.views.generic import RedirectView, TemplateView
        return [
            url('^$', RedirectView.as_view(url='/', permanent=False), name='schema-root'),
            url('^index.jsx',
                TemplateView.as_view(template_name='rest_admin/schema/index.jsx', content_type='text/jsx'),
                name='index'),
        ]  # TODO

    def get_index_urls(self):
        from django.conf.urls import url
        from .views import AdminIndexView
        return [
            url('^$', AdminIndexView.as_view(), name='index'),
        ]

    @property
    def api_urls(self):
        from django.conf.urls import url, include
        urlpatterns = [url('^', include(self.get_api_urls(), namespace='api'))]
        return (urlpatterns, 'rest_admin', self.name)

    @property
    def schema_urls(self):
        from django.conf.urls import url, include
        urlpatterns = [url('^', include(self.get_schema_urls(), namespace='schema'))]
        return (urlpatterns, 'rest_admin', self.name)

    @property
    def index_urls(self):
        urlpatterns = self.get_index_urls()
        return (urlpatterns, 'rest_admin', self.name)

    @property
    def urls(self):
        from django.conf.urls import url, include
        urlpatterns = [
            url('^api/', include(self.get_api_urls(), namespace='api')),
            url('^schema/', include(self.get_schema_urls(), namespace='schema')),
            url('^', include(self.get_index_urls())),
        ]
        return (urlpatterns, 'rest_admin', self.name)


# To be consistent with Django admin (see `django.contrib.admin.sites`).
# This global object represents the default admin site, for the common case.
# You can instantiate AdminSite in your own code to create a custom admin site.
site = RestAdminSite(django_admin_sites.site)
