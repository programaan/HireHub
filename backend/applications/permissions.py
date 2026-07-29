from rest_framework.permissions import BasePermission


class IsCandidate(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "candidate"
        )

class IsApplicationRecruiter(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "recruiter"
        )

    def has_object_permission(self, request, view, obj):

        return obj.job.company.user == request.user