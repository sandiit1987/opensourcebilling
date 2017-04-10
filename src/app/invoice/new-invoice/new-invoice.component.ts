import { Component, OnInit, Output, ViewChild, ViewContainerRef, TemplateRef, EventEmitter } from '@angular/core';
import { DefaultValueService } from './default-value.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
declare var accounting: any;
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

    constructor(private defaultValueService: DefaultValueService, private calculateService: CalculateService){

        this.invoiceFormData = defaultValueService.getInvoiceFormData();
        this.clients = defaultValueService.getClients();
        this.terms = defaultValueService.getTerms();
        this.items = defaultValueService.getItems();
        this.taxData = defaultValueService.getTaxData();
        this.defaultQuantity = defaultValueService.defaultQuantity;
        this.defaultUnitPrice = this.formatNumber(defaultValueService.defaultUnitPrice);

        this.invoiceForm = new FormGroup({
            company: new FormControl(''),
            client: new FormControl(''),
            term: new FormControl(''),
            invoiceNumber: new FormControl(''),
            invoiceDate: new FormControl(this.invoiceFormData.invoiceDate),
            dueDate: new FormControl(),
            items: new FormArray([
                new FormGroup({
                    itemId: new FormControl(""),
                    itemDescription: new FormControl(""),
                    itemUnitCost: new FormControl(this.defaultUnitPrice),
                    itemQty: new FormControl(this.defaultQuantity),
                    itemDiscount: new FormControl(""),
                    itemDiscountPercentage: new FormControl(""),
                    taxId: new FormControl(""),
                    rowCost: new FormControl(0)
                })
            ]),
            totalDiscount: new FormControl('0.00'),
            totalTax: new FormControl('0.00'),
            totalAmount: new FormControl('0.00'),
            notes: new FormControl('')
        });
    }

    addMoreItem(){
        (<FormArray> this.invoiceForm.get('items')).push(new FormGroup({
            itemId: new FormControl(""),
            itemDescription: new FormControl(""),
            itemUnitCost: new FormControl(this.defaultUnitPrice),
            itemQty: new FormControl(this.defaultQuantity),
            itemDiscount: new FormControl(""),
            itemDiscountPercentage: new FormControl(""),
            taxId: new FormControl(""),
            rowCost: new FormControl(0)
        }));

    }

	triggerEventEmitterAddRow(){
        this.addMoreItem();
	}
    swapArrayIndex(arrayItem, oldIndex, newIndex){
        var itemArrayLength = arrayItem.length;
        if (newIndex >= itemArrayLength) {
            var k = newIndex - itemArrayLength;
            while ((k--) + 1) {
                arrayItem.push(undefined);
            }
        }
        arrayItem.splice(newIndex, 0, arrayItem.splice(oldIndex, 1)[0]);
    }
    swapFormControlItems(sortObject){
        var oldIndex = sortObject.oldIndex;
        var newIndex = sortObject.newIndex;
        var itemArray = (<FormArray> this.invoiceForm.get('items')).controls;
        this.swapArrayIndex(itemArray, oldIndex, newIndex);
        var valueArray = this.invoiceForm.value.items;
        this.swapArrayIndex(valueArray, oldIndex, newIndex);
    }

    deleteRowItem(rowIndex){
        (<FormArray> this.invoiceForm.get('items')).controls.splice(rowIndex, 1);
        this.invoiceForm['value'].items.splice(rowIndex, 1);
        this.totalCostCalculation();
    }

    formatNumber(inputNumber){
        return accounting.formatNumber(inputNumber, 2);
    }

    costCalculation(rowIndex, e){
        if(e != undefined){
            var code = e.keyCode || e.which;
            //console.log(code);
            var restrictedKeyCodes = new Array(37, 38, 39, 40, 9, 13);
            if(jQuery.inArray(code, restrictedKeyCodes) != -1){
                return false;
            }
        }
        var formArray: FormArray = (<FormArray> this.invoiceForm.get('items'));
        var unitCost = accounting.unformat((formArray.controls[rowIndex]).get('itemUnitCost').value);
        var qty = accounting.format((formArray.controls[rowIndex]).get('itemQty').value);
        var discountMain = (formArray.controls[rowIndex]).get('itemDiscount').value;
        var discountVal = this.calculateService.getDiscountAmount(unitCost, qty, discountMain);
        //console.log(discountMain+" : "+discountVal);
        var taxId = (formArray.controls[rowIndex]).get('taxId').value;
        var discountPercentage = 0;
        if(this.calculateService.percentageExistInDiscountAmount(discountMain)){
            discountPercentage = discountMain;
            (formArray.controls[rowIndex]).get('itemDiscountPercentage').setValue(this.formatNumber(discountMain)+"%");
        }
        else{
            discountPercentage = this.calculateService.getDiscountPercentage(unitCost, qty, discountVal);
            (formArray.controls[rowIndex]).get('itemDiscountPercentage').setValue(this.formatNumber(discountPercentage)+"%");
        }
        (formArray.controls[rowIndex]).get('itemDiscount').setValue(discountVal);
        var lineTotal = this.formatNumber(this.calculateService.getTotalAmount(unitCost, qty, discountVal, taxId));
        (formArray.controls[rowIndex]).get('rowCost').setValue(lineTotal);
        this.totalCostCalculation();
    }

    totalCostCalculation(){
        var formArray: FormArray = (<FormArray> this.invoiceForm.get('items'));
        var totalTax = 0;
        var totalCost = 0;
        var totalDiscount = 0;
        for(var key in formArray.controls){
            var unformattedRowCost = accounting.unformat(formArray.controls[key].get('rowCost').value);
            totalCost = totalCost + unformattedRowCost;
            var rowTaxId = formArray.controls[key].get('taxId').value;
            var rowItemUnitCost = formArray.controls[key].get('itemUnitCost').value;
            var rowItemQty = formArray.controls[key].get('itemQty').value;
            var rowItemDiscount = formArray.controls[key].get('itemDiscount').value;
            var rowTax = accounting.unformat(this.calculateService.getTaxAmount(rowItemUnitCost, rowItemQty, rowItemDiscount, rowTaxId));
            totalTax = totalTax + rowTax;
            totalDiscount = totalDiscount + accounting.unformat(rowItemDiscount);
        }
        totalCost = this.formatNumber(totalCost);
        this.invoiceForm.get('totalAmount').setValue(totalCost);
        this.invoiceForm.get('totalTax').setValue(this.formatNumber(totalTax));
        this.invoiceForm.get('totalDiscount').setValue(this.formatNumber(totalDiscount));
    }

    invoiceFormSubmit(){
        this.invoiceForm.value.invoiceNumber = this.invoiceNumber.nativeElement.value;
        this.invoiceForm.value.invoiceDate = this.invoiceDate.nativeElement.value;
        this.invoiceForm.value.dueDate = this.invoiceDueDate.nativeElement.value;
        this.passingInvoiceData.emit(this.invoiceForm.value);
        this.passingClientData.emit(this.clients);
        this.passingTermData.emit(this.terms);
        this.passingItemData.emit(this.items);
        this.passingTaxData.emit(this.taxData);
    }

    select2EventUpdateFormControl(rowObject: Object){
        if(rowObject['clientId'] != undefined){
            this.invoiceForm.get('client').setValue(rowObject['clientId']);
        }
        if(rowObject['termId'] != undefined){
            this.invoiceForm.get('term').setValue(rowObject['termId']);
        }
        if(rowObject['itemId'] != undefined){
            (<FormArray>this.invoiceForm.get('items')).controls[rowObject['rowIndex']].get('itemId').setValue(rowObject['itemId']);
        }
        if(rowObject['taxId'] != undefined){
            (<FormArray>this.invoiceForm.get('items')).controls[rowObject['rowIndex']].get('taxId').setValue(rowObject['taxId']);
            this.costCalculation(rowObject['rowIndex'], undefined);
        }
    }

    formatInputUnitCost(rowIndex, itemUnitCost){
        ((<FormArray> this.invoiceForm.get('items')).controls[rowIndex]).get('itemUnitCost').setValue(this.formatNumber(itemUnitCost));
    }

    formatInputItemDiscount(rowIndex, itemDiscount){
        ((<FormArray> this.invoiceForm.get('items')).controls[rowIndex]).get('itemDiscount').setValue(this.formatNumber(itemDiscount));
    }
}
