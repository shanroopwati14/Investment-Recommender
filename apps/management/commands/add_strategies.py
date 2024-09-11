from django.core.management.base import BaseCommand
from apps.home.models import Strategy

class Command(BaseCommand):
    help = 'Seed the database with initial strategies'

    def handle(self, *args, **kwargs):
        strategies = [
            {
                'name': 'Goal-Based Investment',
                'risk_level': 'Medium',
                'description': 'An investment strategy focused on meeting specific financial goals.',
                'target_return': 7.5,
            },
            {
                'name': 'Life-Cycle Investment',
                'risk_level': 'Low',
                'description': 'A strategy where the investment risk decreases as you approach the end of your lifecycle.',
                'target_return': 5.0,
            },
            {
                'name': 'Satellite Investment',
                'risk_level': 'High',
                'description': 'A strategy where the core of the portfolio is stable, but you make riskier investments on the side.',
                'target_return': 10.0,
            },
            {
                'name': 'Core Investment',
                'risk_level': 'Low',
                'description': 'A conservative investment strategy focusing on the core, stable portion of the portfolio.',
                'target_return': 4.5,
            },
            {
                'name': 'Income-Focused Strategy',
                'risk_level': 'Medium',
                'description': 'An investment strategy focused on generating regular income from dividends and bonds.',
                'target_return': 6.5,
            },
            {
                'name': 'Growth-Focused Strategy',
                'risk_level': 'High',
                'description': 'An aggressive investment strategy focused on maximizing capital appreciation.',
                'target_return': 12.0,
            },
        ]

        for strategy_data in strategies:
            strategy, created = Strategy.objects.get_or_create(
                name=strategy_data['name'],
                defaults={
                    'risk_level': strategy_data['risk_level'],
                    'description': strategy_data['description'],
                    'target_return': strategy_data['target_return'],
                },
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully added strategy: {strategy.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Strategy already exists: {strategy.name}'))
