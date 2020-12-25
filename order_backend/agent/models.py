from django.db import models


# Create your models here.
class itw_customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    company_name = models.CharField(max_length=50)
    deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['last_name']
        verbose_name = 'customer'

    def __str__(self):
        return self.first_name

    def as_dict(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "company_name": self.company_name,
            "deleted": self.deleted
        }
