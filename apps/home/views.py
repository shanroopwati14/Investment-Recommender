# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.shortcuts import render, get_object_or_404
from .models import Fund, Strategy
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index'}

    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))

# Funds views
def fund_list(request):
    funds = Fund.objects.all()
    return render(request, 'fund_list.html', {'funds': funds})

def fund_detail(request, fund_id):
    fund = get_object_or_404(Fund, id=fund_id)
    return render(request, 'fund_detail.html', {'fund': fund})

# Strategies views
def strategy_list(request):
    strategies = Strategy.objects.all()
    return render(request, 'strategy_list.html', {'strategies': strategies})

def strategy_detail(request, strategy_id):
    strategy = get_object_or_404(Strategy, id=strategy_id)
    return render(request, 'strategy_detail.html', {'strategy': strategy})

# Goals views
def goal_list(request):
    goals = Goal.objects.all()
    return render(request, 'goal_list.html', {'goals': goals})

def goal_detail(request, goal_id):
    goal = get_object_or_404(Goal, id=goal_id)
    return render(request, 'goal_detail.html', {'goal': goal})

# Investments views
def investment_list(request):
    investments = Investment.objects.all()
    return render(request, 'investment_list.html', {'investments': investments})

def investment_detail(request, investment_id):
    investment = get_object_or_404(Investment, id=investment_id)
    return render(request, 'investment_detail.html', {'investment': investment})

# Settings view
def settings(request):
    return render(request, 'settings.html')

# APIs for Funds and Strategies
def api_funds(request):
    funds = list(Fund.objects.values())
    return JsonResponse(funds, safe=False)

def api_strategies(request):
    strategies = list(Strategy.objects.values())
    return JsonResponse(strategies, safe=False)

# APIs for Goals and Investments
def api_goals(request):
    goals = list(Goal.objects.values())
    return JsonResponse(goals, safe=False)

def api_investments(request):
    investments = list(Investment.objects.values())
    return JsonResponse(investments, safe=False)