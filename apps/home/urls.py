# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

from django.urls import path, re_path
from . import views

urlpatterns = [

    # The home page
    path('', views.fund_list, name='fund_list'),

    # Matches any html file
    re_path(r'^.*\.html?$', views.pages, name='pages'),

    # Funds URLs
    path('funds/', views.fund_list, name='fund_list'),
    path('funds/<int:fund_id>/', views.fund_detail, name='fund_detail'),

    # Strategies URLs
    path('strategies/', views.strategy_list, name='strategy_list'),
    path('strategies/<int:strategy_id>/', views.strategy_detail, name='strategy_detail'),

    # Goals URLs
    path('goals/', views.goal_list, name='goal_list'),
    path('goals/<int:goal_id>/', views.goal_detail, name='goal_detail'),

    # Investments URLs
    path('investments/', views.investment_list, name='investment_list'),
    path('investments/<int:investment_id>/', views.investment_detail, name='investment_detail'),

    # Settings URL
    path('settings/', views.settings, name='settings'),

    # APIs for Funds and Strategies
    path('api/funds/', views.api_funds, name='api_funds'),
    path('api/strategies/', views.api_strategies, name='api_strategies'),

    # APIs for Goals and Investments
    path('api/goals/', views.api_goals, name='api_goals'),
    path('api/investments/', views.api_investments, name='api_investments'),
]

