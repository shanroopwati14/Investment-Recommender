from django.urls import path
from . import views

urlpatterns = [
    #path for the popularity based
    path('gpt-response/', views.gpt_response_view, name='gpt_response'),

    #path for goal based
    path('gpt_goal-recommend/', views.gpt_goalrecommendation_view, name='gpt_goal-recommend'),
]