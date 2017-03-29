import { Component, OnInit, Output, ViewChild, ViewContainerRef, TemplateRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DefaultValueService } from './default-value.service';
declare var jQuery: any;
@Component({
  selector: 'osb-new-invoice',
  templateUrl: './new-invoice.component.html'
})
export class NewInvoiceComponent {
    @ViewChild('clone') template;

    @ViewChild('container', {read:ViewContainerRef}) container;

    @Output() passingInvoiceData = new EventEmitter();
    @Output() passingClientData = new EventEmitter();
    @Output() passingTermData = new EventEmitter();
    @Output() passingItemData = new EventEmitter();
    @Output() passingTaxData = new EventEmitter();

    private invoiceFormData;
    private clients: Object[];
    private terms: Object[];
    private items: Object[];
    private taxData: Object[];
    private defaultQuantity: Number;
    private defaultUnitPrice;

    constructor(private resolver:ComponentFactoryResolver, private defaultValueService: DefaultValueService){
        //console.log(defaultValueService.getInvoiceFormData());
        this.invoiceFormData = defaultValueService.getInvoiceFormData();
        this.clients = defaultValueService.getClients();
        this.terms = defaultValueService.getTerms();
        this.items = defaultValueService.getItems();
        this.taxData = defaultValueService.getTaxData();
        this.defaultQuantity = defaultValueService.defaultQuantity;
        this.defaultUnitPrice = defaultValueService.defaultUnitPrice.toFixed(2);

    }

	triggerEventEmitterAddRow(){
		this.cloneTemplate();
	}
    cloneTemplate(){
        this.container.createEmbeddedView(this.template);
    }
    saveInvoiceData(){
        var self = this;
        self.invoiceFormData.items = [];
		self.invoiceFormData.client = jQuery("select[name=client-id]").val();
        self.invoiceFormData.term = jQuery("select[name=term-id]").val();
        self.invoiceFormData.dueDate = jQuery("input[name=due-date]").val();
        jQuery('.invoice-items tr').each(function(){
            //console.log(jQuery(this).find('select[name=tax-id]').val());
            var itemObject = {
                itemId: jQuery(this).find('select[name=item-id]').val(),
                itemDescription: jQuery(this).find('input[name=item-description]').val(),
                itemUnitCost: jQuery(this).find('input[name=item-unit-cost]').val(),
                itemQty: jQuery(this).find('input[name=item-qty]').val(),
                taxId: jQuery(this).find('select[name=tax-id]').val(),
                rowCost: jQuery(this).find('input[name=item-cost]').val()
            };
            self.invoiceFormData.items.push(itemObject);

        });
        self.invoiceFormData.subTotal = jQuery('#cost-subtotal').html();
        self.invoiceFormData.discountOption = jQuery('#discount-option').val();
        self.invoiceFormData.netTotal = jQuery('#item-net-total').html();
        //console.log(self.invoiceFormData);
        self.passingInvoiceData.emit(self.invoiceFormData);
        self.passingClientData.emit(self.clients);
        self.passingTermData.emit(self.terms);
        self.passingItemData.emit(self.items);
        self.passingTaxData.emit(self.taxData);
	}
    listenDiscountOptionEvent(discountOption: String){
        //console.log(discountOption+"OK");
        var totalCost: any = 0;
        jQuery('.invoice-items').find('input[name=item-cost]').each(function(){
            var rowCost = jQuery(this).val();
            if(rowCost == ""){
                rowCost = 0;
            }
            totalCost = parseFloat(totalCost) + parseFloat(rowCost);
        });
        //console.log(totalCost);
        var discountVal = jQuery('#discount-value').val();
        if(discountVal == ""){
            discountVal = 0;
        }
        if(discountOption == "percent"){
            totalCost = totalCost - ((discountVal / 100) * totalCost);
        }
        else{
            totalCost = totalCost - discountVal;
        }
        totalCost = totalCost.toFixed(2);
        jQuery('#item-net-total').html("$"+totalCost);
    }
}
