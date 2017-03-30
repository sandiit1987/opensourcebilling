import { Directive, ElementRef } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
@Directive({
  selector: '[itemDiscount]'
})
export class ItemDiscountDirective {
    private elementRef: ElementRef;
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {
        
        this.elementRef = elementRef;
        jQuery(this.elementRef.nativeElement).on('keyup', function(){
            var discountVal = jQuery(this).val();
            var unitCost: any = parseFloat(jQuery(this).parent().parent().find('input[name=item-unit-cost]').val()).toFixed(2);
            if(isNaN(unitCost)){
                unitCost = 0;
            }
            var qty = parseInt(jQuery(this).parent().parent().find('input[name=item-qty]').val());
            if(isNaN(qty)){
                qty = 0;
            }
            var discountAmount = calculateService.getDiscountAmount(unitCost, qty, discountVal);
            jQuery(this).val(discountAmount);

            if(calculateService.percentageExistInDiscountAmount(discountVal)){
                jQuery(this).parent().find('span').html(discountAmount);
            }
            else{
                var discountPercentage = calculateService.getDiscountPercentage(unitCost, qty, discountVal);
                if(discountPercentage == undefined){
                    jQuery(this).parent().find('span').html("");
                }
                else{
                    jQuery(this).parent().find('span').html(discountPercentage.toFixed(2)+"%");
                }

            }
            var taxId = jQuery(this).parent().parent().find('select[name=tax-id]').val();
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

}
