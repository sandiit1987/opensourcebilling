import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[itemDiscount]'
})
export class ItemDiscountDirective {
    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
        jQuery(this.elementRef.nativeElement).on('keyup', function(){
            var discountVal = jQuery(this).val();
            var totalCost: any = 0;
            jQuery('.invoice-items').find('input[name=item-cost]').each(function(){
                var rowCost = jQuery(this).val();
                if(rowCost == ""){
                    rowCost = 0;
                }
                totalCost = parseFloat(totalCost) + parseFloat(rowCost);
            });

            var discountOption = jQuery("#discount-option").val();
            if(isNaN(discountVal) || discountVal == ""){
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
        });
    }

}
