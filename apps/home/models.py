# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""
from django.db import models


class Fund(models.Model):
    name = models.CharField(max_length=255)
    rating = models.IntegerField(null=True, blank=True)
    one_year_return = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    one_year_rank = models.CharField(max_length=50, null=True, blank=True)
    riskometer = models.CharField(max_length=50, null=True)
    # Add any new fields or modify existing ones here

    def __str__(self):
        return self.name

# Strategy Model
class Strategy(models.Model):
    name = models.CharField(max_length=100, unique=True)
    risk_level = models.CharField(max_length=50)
    description = models.TextField()
    target_return = models.DecimalField(max_digits=5, decimal_places=2)
    funds = models.ManyToManyField(Fund)

    def __str__(self):
        return self.name