from django.urls import path
from . import views

urlpatterns = [
    path('gpt-response/', views.gpt_response_view, name='gpt_response'),
]