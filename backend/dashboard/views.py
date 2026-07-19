from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from jobs.permissions import IsRecruiter

from jobs.models import Job
from applications.models import Application
from applications.permissions import IsCandidate


class RecruiterDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def get(self, request):

        recruiter = request.user.recruiter_profile

        jobs = Job.objects.filter(
            company=recruiter
        )

        applications = Application.objects.filter(
            job__company=recruiter
        )

        data = {

            "jobs_posted": jobs.count(),

            "total_applications": applications.count(),

            "pending": applications.filter(
                status="pending"
            ).count(),

            "accepted": applications.filter(
                status="accepted"
            ).count(),

            "rejected": applications.filter(
                status="rejected"
            ).count(),

        }

        return Response(data)

class CandidateDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def get(self, request):

        candidate = request.user.candidate_profile

        applications = Application.objects.filter(
            candidate=candidate
        ).select_related(
            "job",
            "job__company",
        ).order_by("-applied_at")

        latest = []

        for app in applications[:5]:

            latest.append({

                "job_title": app.job.title,

                "company": app.job.company.company_name,

                "status": app.status,

                "applied_at": app.applied_at,

            })

        data = {

            "applications": applications.count(),

            "pending": applications.filter(
                status="pending"
            ).count(),

            "accepted": applications.filter(
                status="accepted"
            ).count(),

            "rejected": applications.filter(
                status="rejected"
            ).count(),

            "latest_applications": latest,

        }

        return Response(data)