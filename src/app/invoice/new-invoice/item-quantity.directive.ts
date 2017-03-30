import { Directive, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
@Directive({
  selector: '[itemQuantity]'
})
export class ItemQuantityDirective implements OnInit {

    private elementRef: ElementRef;
    @Output() triggerEventEmitter = new EventEmitter();
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {
        this.elementRef = elementRef;
        var self = this;
        //this.triggerEventEmitter.emit("trigger");
        jQuery(this.elementRef.nativeElement).on('blur', function(){
            //console.log("Blur");
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
            /*if(currentRowNumber == totalRows){
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
            }*/
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == 13){
                self.triggerEventEmitter.emit("triggerClickAddItem");
            }
        });
        jQuery(this.elementRef.nativeElement).on('keyup', function(){

            var unitCost = parseInt(jQuery(this).parent().parent().find('input[name=item-unit-cost]').val());
            if(isNaN(unitCost)){
                unitCost = 0;
            }

            var qty: any = parseFloat(jQuery(this).val()).toFixed(2);
            if(isNaN(qty)){
                qty = 0;
            }

            var discountVal = jQuery(this).closest('tr').find("input[name=item-discount]").val();

            var taxId = jQuery(this).parent().parent().find('select[name=tax-id]').val();

            var discountPercentage = calculateService.getDiscountPercentage(unitCost, qty, discountVal);

            if(discountPercentage == undefined){
                jQuery(this).closest('tr').find('input[name=item-discount]').closest('td').find('span').html("");
            }
            else{
                jQuery(this).closest('tr').find('input[name=item-discount]').closest('td').find('span').html(discountPercentage.toFixed(2)+"%");
            }

            var lineTotal = calculateService.getTotalAmount(unitCost, qty, discountVal, taxId);
            jQuery(this).closest('tr').find('input[name=item-cost]').val(lineTotal);

            var totalCost: any = 0;
            jQuery(this).closest('.invoice-items').find('input[name=item-cost]').each(function(){
                var rowCost = jQuery(this).val();
                if(rowCost == ""){
                    rowCost = 0;
                }
                totalCost = parseFloat(totalCost) + parseFloat(rowCost);

            });
            totalCost = totalCost.toFixed(2);
            jQuery("#item-net-total").html("$"+totalCost);

        });
    }

    ngOnInit(){




    }
}
