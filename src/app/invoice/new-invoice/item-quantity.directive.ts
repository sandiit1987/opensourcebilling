import { Directive, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[itemQuantity]'
})
export class ItemQuantityDirective implements OnInit {

    private elementRef: ElementRef;
    @Output() triggerEventEmitter = new EventEmitter();
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
        var self = this;
        //this.triggerEventEmitter.emit("trigger");
        jQuery(this.elementRef.nativeElement).on('blur', function(){
            console.log("Blur");
            var totalRows = jQuery('.billing-item-section table tbody tr').length;
            var currentRowNumber = jQuery(this).closest('tr').index() + 1;
            if(currentRowNumber == totalRows){
                var itemDescription = jQuery(this).closest('tr').find('input[name=item-description]').val();
                var itemUnitCost = jQuery(this).closest('tr').find('input[name=item-unit-cost]').val();
                var itemQty = jQuery(this).closest('tr').find('input[name=item-qty]').val();
                if(itemDescription != "" && itemUnitCost != "" && itemQty != ""){
                    self.triggerEventEmitter.emit("triggerClickAddItem");
                }

            }
        });
        jQuery(this.elementRef.nativeElement).on('keypress', function(e){
            var totalRows = jQuery('.billing-item-section table tbody tr').length;
            var currentRowNumber = jQuery(this).closest('tr').index() + 1;
            if(currentRowNumber == totalRows){
                var keycode = (e.keyCode ? e.keyCode : e.which);
                console.log(keycode);
                if(keycode == 13){
                    var itemDescription = jQuery(this).closest('tr').find('input[name=item-description]').val();
                    var itemUnitCost = jQuery(this).closest('tr').find('input[name=item-unit-cost]').val();
                    var itemQty = jQuery(this).closest('tr').find('input[name=item-qty]').val();
                    if(itemDescription != "" && itemUnitCost != "" && itemQty != ""){
                        self.triggerEventEmitter.emit("triggerClickAddItem");
                    }
                }
            }
        });
    }

    ngOnInit(){


        jQuery(this.elementRef.nativeElement).on('keyup', function(){
            var qty: any = parseFloat(jQuery(this).val()).toFixed(2);
            if(isNaN(qty)){
                qty = 0;
            }
            //console.log(unitCost);
            var unitCost = parseInt(jQuery(this).parent().parent().find('input[name=item-unit-cost]').val());
            if(isNaN(unitCost)){
                unitCost = 0;
            }
            //console.log(qty);
            var lineTotal: any = unitCost * qty;
            lineTotal = lineTotal.toFixed(2);
            //lineTotal = parseFloat(unitCost).toFixed(2);
            jQuery(this).parent().parent().find('input[name=item-cost]').val(lineTotal);
            //console.log(lineTotal);
            var totalCost: any = 0;
            jQuery(this).closest('.invoice-items').find('input[name=item-cost]').each(function(){
                var rowCost = jQuery(this).val();
                if(rowCost == ""){
                    rowCost = 0;
                }
                totalCost = parseFloat(totalCost) + parseFloat(rowCost);

            });
            totalCost = totalCost.toFixed(2);
            jQuery('#cost-subtotal').html("$"+totalCost);
            var discountOption = jQuery("#discount-option").val();
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
            //console.log(totalCost);
            totalCost = totalCost.toFixed(2);
            jQuery('#item-net-total').html("$"+totalCost);
            //console.log(jQuery(this).closest('.billing-item-section').find('.gridsummary-table').attr('class'));
            //console.log(totalCost);
        });

    }
}
