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

    private invoiceFormData;
    private clients: Object[];
    private terms: Object[];
    private items: Object[];


    private getCurrentFormattedDate(){
         var today: any = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();
         if(dd<10) {
             dd='0'+dd
         }
         if(mm<10) {
             mm='0'+mm
         }
         today = dd+'/'+mm+'/'+yyyy;
         return today;
    }

    constructor(private resolver:ComponentFactoryResolver, private defaultValueService: DefaultValueService){
        //console.log(defaultValueService.getInvoiceFormData());
        this.invoiceFormData = defaultValueService.getInvoiceFormData();
        this.clients = defaultValueService.getClients();
        this.terms = defaultValueService.getTerms();
        this.items = defaultValueService.getItems();
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
            var itemObject = {
                itemId: jQuery(this).find('select[name=item-id]').val(),
                itemDescription: jQuery(this).find('input[name=item-description]').val(),
                itemUnitCost: jQuery(this).find('input[name=item-unit-cost]').val(),
                itemQty: jQuery(this).find('input[name=item-qty]').val(),
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
