import os
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'version.txt')) as f:
    __version__ = f.read().strip()

from .core.sites import RestAdminSite, site  # noqa
