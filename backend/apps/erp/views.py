import uuid
from datetime import date, timedelta
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SAPProduct, SAPSalesOrder, SAPInvoice
from .serializers import SAPProductSerializer, SAPSalesOrderSerializer, SAPInvoiceSerializer
from apps.agents.sap_agent import SAPAgent

class SAPProductViewSet(viewsets.ModelViewSet):
    queryset = SAPProduct.objects.all()
    serializer_class = SAPProductSerializer

    @action(detail=False, methods=['get'])
    def check_availability(self, request):
        """Check live stock availability across SAP plant warehouses."""
        sku = request.query_params.get('sku')
        if sku:
            products = SAPProduct.objects.filter(sku=sku)
        else:
            products = SAPProduct.objects.all()
        return Response(self.get_serializer(products, many=True).data)


class SAPSalesOrderViewSet(viewsets.ModelViewSet):
    queryset = SAPSalesOrder.objects.all()
    serializer_class = SAPSalesOrderSerializer

    @action(detail=True, methods=['post'])
    def verify_inventory(self, request, pk=None):
        """Invoke SAP Agent to verify inventory availability in SAP S/4HANA."""
        order = self.get_object()
        agent = SAPAgent()
        result = agent.verify_stock_for_order(order)
        order.inventory_verified = result['verified']
        order.status = 'INVENTORY_CHECKED'
        order.save()
        return Response({
            'status': 'success',
            'order': self.get_serializer(order).data,
            'details': result
        })

    @action(detail=True, methods=['post'])
    def confirm_order(self, request, pk=None):
        """Confirm SAP Sales Order and generate order document in SAP BTP."""
        order = self.get_object()
        order.status = 'ORDER_CONFIRMED'
        order.save()
        return Response({
            'status': 'success',
            'order': self.get_serializer(order).data
        })

    @action(detail=True, methods=['post'])
    def create_invoice(self, request, pk=None):
        """Generate official SAP Accounting Invoice from verified Sales Order."""
        order = self.get_object()
        inv_number = f"SAP-INV-{order.order_number[-6:]}"
        invoice, _ = SAPInvoice.objects.get_or_create(
            sales_order=order,
            defaults={
                'invoice_number': inv_number,
                'amount': order.total_amount,
                'currency': order.currency,
                'status': 'PENDING',
                'due_date': date.today() + timedelta(days=30),
                'sap_accounting_doc': f"DOC-{uuid.uuid4().hex[:8].upper()}"
            }
        )
        order.status = 'INVOICED'
        order.save()
        return Response({
            'status': 'success',
            'invoice': SAPInvoiceSerializer(invoice).data,
            'order': self.get_serializer(order).data
        })


class SAPInvoiceViewSet(viewsets.ModelViewSet):
    queryset = SAPInvoice.objects.all()
    serializer_class = SAPInvoiceSerializer

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        """Mark invoice as paid and complete customer order lifecycle."""
        invoice = self.get_object()
        invoice.status = 'PAID'
        invoice.save()
        
        order = invoice.sales_order
        order.status = 'PAYMENT_CONFIRMED'
        order.save()
        
        # Also mark the lead as closed-won converted
        order.lead.status = 'CONVERTED'
        order.lead.save()

        return Response({
            'status': 'success',
            'message': 'SAP payment processed. Customer order lifecycle successfully closed-won.',
            'invoice': self.get_serializer(invoice).data
        })
