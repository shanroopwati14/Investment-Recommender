# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib import admin
from .models import Fund, Strategy

@admin.register(Fund)
class FundAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'one_year_return', 'one_year_rank', 'riskometer')
    search_fields = ('name', 'riskometer')


@admin.register(Strategy)
class StrategyAdmin(admin.ModelAdmin):
    list_display = ('name', 'risk_level', 'target_return')
    search_fields = ('name',)
    filter_horizontal = ('funds',)