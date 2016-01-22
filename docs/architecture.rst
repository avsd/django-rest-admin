====================================
API-Driven Django Admin Architecture
====================================

There are 3 independent layers forming interface of the system:

* Admin API (on top of `Django Rest Framework <http://www.django-rest-framework.org/>`_)
* Dynamic Schema
* Static front-end

The API layer and the part of Schema implementation responsible for extracting admin structure
are stand-alone. The Static front-end layer and the part of Schema implementation responsible
for rendering the schema are plugin-based.

.. image:: img/architecture.png

Django Rest Admin is designed for maximum reusability. It uses exactly the same declarative
syntax as the built-in Django admin. ``ModelAdmin`` classes are used to generate both API
endpoints and dynamic front-end schema. Plugin-specific templates are used to generate the schema.
The generated dynamic schema is then used by plugin-specific static part to render admin
front-end.
