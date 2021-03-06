#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'rest_admin', 'version.txt')) as f:
    version = f.read().strip()


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

if sys.argv[-1] == 'publish':
    try:
        import wheel  # noqa
    except ImportError:
        print('Wheel library missing. Please run "pip install wheel"')
        sys.exit()
    os.system('python setup.py sdist upload')
    os.system('python setup.py bdist_wheel upload')
    sys.exit()

if sys.argv[-1] == 'tag':
    print("Tagging the version on github:")
    os.system("git tag -a %s -m 'version %s'" % (version, version))
    os.system("git push --tags")
    sys.exit()

readme = open('README.rst').read()
history = open('HISTORY.rst').read().replace('.. :changelog:', '')

setup(
    name='django-rest-admin',
    version=version,
    description="""Single-page Django Admin using django-reset-framework and React""",
    long_description=readme + '\n\n' + history,
    author='David Avsajanishvili',
    author_email='david@davidavs.com',
    url='https://github.com/avsd/django-rest-admin',
    packages=[
        'rest_admin',
    ],
    include_package_data=True,
    install_requires=[
        'djangorestframework>=3.3.1,<4',
    ],
    license="BSD",
    zip_safe=False,
    keywords='django-rest-admin',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: Django',
        'Framework :: Django :: 1.7',
        'Framework :: Django :: 1.8',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
)
