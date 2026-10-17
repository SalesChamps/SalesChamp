from rest_framework import serializers
from .models import SAPProduct, SAPSalesOrder, SAPInvoice
from apps.leads.serializers import LeadSerializer

class SAPProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SAPProduct
        fields = '__all__'


class SAPInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SAPInvoice
        fields = '__all__'


class SAPSalesOrderSerializer(serializers.ModelSerializer):
    lead_details = LeadSerializer(source='lead', read_only=True)
    invoices = SAPInvoiceSerializer(many=True, read_only=True)

    class Meta:
        model = SAPSalesOrder
        fields = '__all__'
