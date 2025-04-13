from django.urls import path
from .views import connections_view, submit_job

urlpatterns = [
    path("api/connections", connections_view),
    path("api/submit-job", submit_job),
]