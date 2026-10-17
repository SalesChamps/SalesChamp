"""
WSGI config for SalesChamp project.
"""
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'saleschamp_core.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
