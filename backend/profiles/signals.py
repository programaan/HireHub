from django.db.models.signals import post_save
from django.dispatch import receiver

from accounts.models import User

from .models import CandidateProfile, RecruiterProfile


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):

    if not created:
        return

    if instance.role == "candidate":

        CandidateProfile.objects.create(user=instance)

    elif instance.role == "recruiter":

        RecruiterProfile.objects.create(user=instance)