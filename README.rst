=============================
RESTful Django Admin - WIP
=============================

.. .. image:: https://badge.fury.io/py/django-rest-admin.png
    :target: https://badge.fury.io/py/django-rest-admin

.. .. image:: https://travis-ci.org/avsd/django-rest-admin.png?branch=master
    :target: https://travis-ci.org/avsd/django-rest-admin

Single-page Django Admin using django-reset-framework and React.
Supports other front-end frameworks via plugins.

**Convert Admin site to a Single-page app in a few lines of code.**
  If you already use Django admin there is no need to rewrite anything!
  Just replace ``django.contrib.admin`` with ``rest_admin`` and your old-fashioned
  admin site will turn into a single-page app.

**Choose front-end framework from a number of available plugins.**
  ... or write your own! RESTful Django Admin comes with flexible plugin-based
  architecture. By default React is used as a front-end, but it can be easily written
  in Angular, Ember or any other framework.

**Re-usable API and Front-end Schema that play well together.**
  RESTful Django Admin derives REST API and Schema from
  ``ModelAdmin`` declarations that usually can be found in ``admin.py`` files
  in your project. You can use it not only for admin site, but also for prototyping
  the front-end! Just copy&paste auto-generated code fragments and use them
  together with the auto-generated API.

This project is still WIP. Please,
`get in touch <mailto:david@davidavs.com?subject=RESTful%20Django%20Admin>`_
if you want to help!

Features
--------

* TODO

..  Documentation
    -------------
    
    The full documentation is at https://django-rest-admin.readthedocs.org.
    
    Quickstart
    ----------
    
    Install django-rest-admin::
    
        pip install django-rest-admin
    
    Then use it in a project::
    
        import rest_admin
    
    TODO
    
    Running Tests
    --------------
    
    Does the code actually work?
    
    ::
    
        source <YOURVIRTUALENV>/bin/activate
        (myenv) $ pip install -r requirements-text.txt
        (myenv) $ python runtests.py

..  Credits
    ---------
    
    Tools used in rendering this package:
    
    *  Cookiecutter_
    *  `cookiecutter-pypackage`_
    
    .. _Cookiecutter: https://github.com/audreyr/cookiecutter
    .. _`cookiecutter-pypackage`: https://github.com/pydanny/cookiecutter-djangopackage
