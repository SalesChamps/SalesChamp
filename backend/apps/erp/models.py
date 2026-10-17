from django.db import models
from apps.common.models import BaseModel
from apps.leads.models import Lead

class SAPProduct(BaseModel):
    sku = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, default=12500.00)
    stock_quantity = models.IntegerField(default=150)
    allocated_quantity = models.IntegerField(default=12)
    warehouse_location = models.CharField(max_length=100, default='WH-Frankfurt-01')
    category = models.CharField(max_length=100, default='Cloud Infrastructure Core')
    status = models.CharField(max_length=50, default='IN_STOCK')

    class Meta:
        ordering = ['sku']

    def __str__(self):
        return f"{self.sku} - {self.name} ({self.stock_quantity} in stock)"


class SAPSalesOrder(BaseModel):
    STATUS_CHOICES = [
        ('QUOTATION_DRAFTED', 'SAP Quotation Created'),
        ('INVENTORY_CHECKED', 'Inventory Allocated & Verified'),
        ('ORDER_CONFIRMED', 'SAP Sales Order Confirmed'),
        ('DISPATCHED', 'Fulfillment Scheduled & Dispatched'),
        ('INVOICED', 'Invoice Generated & Dispatched'),
        ('PAYMENT_CONFIRMED', 'Payment Cleared / Closed-Won'),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='sap_orders')
    order_number = models.CharField(max_length=50, unique=True)
    quotation_number = models.CharField(max_length=50, blank=True, default='')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='QUOTATION_DRAFTED')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=125000.00)
    currency = models.CharField(max_length=10, default='USD')
    inventory_verified = models.BooleanField(default=True)
    items = models.JSONField(default=list, blank=True)
    sap_doc_type = models.CharField(max_length=20, default='OR_STANDARD')
    delivery_date = models.DateField(null=True, blank=True)
    customer_master_id = models.CharField(max_length=50, blank=True, default='')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"SAP Order {self.order_number} ({self.lead.company_name}) - ${self.total_amount}"


class SAPInvoice(BaseModel):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Payment'),
        ('PAID', 'Payment Cleared'),
        ('OVERDUE', 'Payment Overdue'),
    ]

    sales_order = models.ForeignKey(SAPSalesOrder, on_delete=models.CASCADE, related_name='invoices')
    invoice_number = models.CharField(max_length=50, unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='PENDING')
    due_date = models.DateField()
    paid_at = models.DateTimeField(null=True, blank=True)
    sap_accounting_doc = models.CharField(max_length=50, blank=True, default='')

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.status} (${self.amount})"
