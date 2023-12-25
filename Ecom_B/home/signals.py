# signals.py

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone
from django.apps import AppConfig
from django.apps import apps
from django.shortcuts import get_object_or_404  # Import get_object_or_404

from .models import Users

@receiver(pre_save, sender=Users)
def update_otp_sent_time(sender, instance, **kwargs):
    # Check if the OTP field has changed
    if instance.pk is not None:
        try:
            old_instance = Users.objects.get(pk=instance.pk)
        except Users.DoesNotExist:
            old_instance = None  # Handle the case where the object does not exist

        if old_instance and old_instance.OTP != instance.OTP:
            # Update the OTP_sent_time field to the current time
            instance.OTP_sent_time = timezone.now()

# Connect the signals when the app is ready
class YourAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'your_app'

    def ready(self):
        # Import the model dynamically to avoid circular import issues
        YourModel = apps.get_model('home', 'Users')
        pre_save.connect(update_otp_sent_time, sender=YourModel)
