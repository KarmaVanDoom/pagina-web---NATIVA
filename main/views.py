from django.shortcuts import render


def index(request):
    """Página de inicio."""
    return render(request, 'dashboard/index.html')

