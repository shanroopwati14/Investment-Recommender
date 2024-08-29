from django.db import models


class Recommendation(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title


from django.db import models

# Create your models here.
