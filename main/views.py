from django.shortcuts import render


def index(request):
    """Página de inicio."""
    return render(request, 'dashboard/index.html')


def nosotros(request):
    """Página de Nosotros."""
    return render(request, 'about/nosotros.html')


def productos(request):
    """Página de Productos."""
    return render(request, 'product/productos.html')



