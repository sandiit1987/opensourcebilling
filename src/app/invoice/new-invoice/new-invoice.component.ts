import { Component, OnInit, Output, ViewChild, ViewContainerRef, TemplateRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DefaultValueService } from './default-value.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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

    private invoiceForm: FormGroup;
    @ViewChild('invoiceDate') invoiceDate;
    @ViewChild('invoiceDueDate') invoiceDueDate;
    @ViewChild('invoiceNumber') invoiceNumber;

    constructor(private resolver:ComponentFactoryResolver, private defaultValueService: DefaultValueService){
        //console.log(defaultValueService.getInvoiceFormData());
        this.invoiceFormData = defaultValueService.getInvoiceFormData();
        this.clients = defaultValueService.getClients();
        this.terms = defaultValueService.getTerms();
        this.items = defaultValueService.getItems();
        this.taxData = defaultValueService.getTaxData();
        this.defaultQuantity = defaultValueService.defaultQuantity;
        this.defaultUnitPrice = defaultValueService.defaultUnitPrice.toFixed(2);

        this.invoiceForm = new FormGroup({
            company: new FormControl(''),
            'client-id': new FormControl(''),
            'term-id': new FormControl(''),
            invoiceNumber: new FormControl(''),
            invoiceDate: new FormControl(),
            'due-date': new FormControl(),
            /*items: new FormGroup({
                itemId: new FormArray([
                    new FormControl('')
                ])
            })*/
            /*items: new FormArray([
                new FormControl('')
            ])*/
            /*items: new FormGroup({
                'userName': new FormControl('')
            })*/
            items: new FormArray([
                new FormGroup({
                    itemId: new FormControl(""),
                    itemDescription: new FormControl(""),
                    itemUnitCost: new FormControl(""),
                    itemQty: new FormControl(""),
                    itemDiscount: new FormControl(""),
                    itemDiscountPercentage: new FormControl(""),
                    taxId: new FormControl(""),
                    rowCost: new FormControl("")
                })
            ])
        });



    }
    addMoreItem(){

        (<FormArray> this.invoiceForm.get('items')).push(new FormGroup({
            itemId: new FormControl(""),
            itemDescription: new FormControl(""),
            itemUnitCost: new FormControl(""),
            itemQty: new FormControl(""),
            itemDiscount: new FormControl(""),
            itemDiscountPercentage: new FormControl(""),
            taxId: new FormControl(""),
            rowCost: new FormControl("")
        }));

    }
	triggerEventEmitterAddRow(){
		this.cloneTemplate();
	}
    cloneTemplate(){
        this.container.createEmbeddedView(this.template);
    }
    invoiceFormSubmit(){
        //console.log(this.invoiceDate.nativeElement.value);
        this.invoiceForm.value.invoiceNumber = this.invoiceNumber.nativeElement.value;
        this.invoiceForm.value.invoiceDate = this.invoiceDate.nativeElement.value;
        this.invoiceForm.value['due-date'] = this.invoiceDueDate.nativeElement.value;
        console.log(this.invoiceForm);
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
                itemDiscount: jQuery(this).find('input[name=item-discount]').val(),
                itemDiscountPercentage: jQuery(this).find('input[name=item-discount]').parent().find('span').html(),
                taxId: jQuery(this).find('select[name=tax-id]').val(),
                rowCost: jQuery(this).find('div.item-cost').html()
            };
            self.invoiceFormData.items.push(itemObject);

        });
        self.invoiceFormData.subTotal = jQuery('#cost-subtotal').html();
        self.invoiceFormData.discountOption = jQuery('#discount-option').val();
        self.invoiceFormData.discountValue = jQuery('#discount-value').val();
        self.invoiceFormData.taxValue = jQuery('#tax-value').val();
        self.invoiceFormData.netTotal = jQuery('#item-net-total').html();
        //console.log(self.invoiceFormData);
        self.passingInvoiceData.emit(self.invoiceFormData);
        self.passingClientData.emit(self.clients);
        self.passingTermData.emit(self.terms);
        self.passingItemData.emit(self.items);
        self.passingTaxData.emit(self.taxData);
	}

}
