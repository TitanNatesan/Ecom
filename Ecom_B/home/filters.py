# filters.py
from django_filters import rest_framework as filters
from .models import Products

class ProductTagFilter(filters.BaseCSVFilter, filters.CharFilter):
    def filter(self, queryset, value):
        if value:
            if isinstance(value, str):  # Check if value is a string
                tags = value.split(',')
            else:  # Assume it's already a list
                tags = value
            return queryset.filter(tag__overlap=tags)
        return queryset

class ProductFilter(filters.FilterSet):
    tags = ProductTagFilter(field_name='tag')
    min_price = filters.NumberFilter(field_name='sellingPrice', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='sellingPrice', lookup_expr='lte')

    class Meta:
        model = Products
        fields = ['tags', 'min_price', 'max_price']
