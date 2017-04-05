import { Directive, ElementRef } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
declare var accounting: any;
@Directive({
  selector: '[itemDiscount]'
})
export class ItemDiscountDirective {
    private elementRef: ElementRef;
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {

        this.elementRef = elementRef;
        jQuery(this.elementRef.nativeElement).on('blur', function(){
            var discountValue = accounting.formatMoney(jQuery(this).val());
            jQuery(this).val(discountValue);
        });
        jQuery(this.elementRef.nativeElement).on('keyup', function(e){
            var code = e.keyCode || e.which;
            //console.log(code);
            var restrictedKeyCodes = new Array(37, 38, 39, 40, 9);
            if(jQuery.inArray(code, restrictedKeyCodes) != -1){
                return false;
            }
            var discountVal = jQuery(this).val();
            var unitCost: any = accounting.unformat(jQuery(this).parent().parent().find('input[name=item-unit-cost]').val()).toFixed(2);
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
                    jQuery(this).parent().find('span').html("0.00%");
                }
                else{
                    jQuery(this).parent().find('span').html(discountPercentage.toFixed(2)+"%");
                }

            }
            var taxId = jQuery(this).parent().parent().find('select[name=tax-id]').val();
            var lineTotal = calculateService.getTotalAmount(unitCost, qty, discountVal, taxId);
            jQuery(this).closest('tr').find('div.item-cost').html(lineTotal);

            var totalCost: any = 0;
            jQuery(this).closest('.invoice-items').find('div.item-cost').each(function(){
                var rowCost = accounting.unformat(jQuery(this).html());
                if(rowCost == ""){
                    rowCost = 0;
                }
                totalCost = parseFloat(totalCost) + parseFloat(rowCost);

            });
            totalCost = accounting.formatMoney(totalCost);
            jQuery("#item-net-total").html(totalCost);
            /* Total discount calculation */
            var totalDiscount: any = 0;
            jQuery('.invoice-items').find('input[name=item-discount]').each(function(){
                var rowDiscount = accounting.unformat(jQuery(this).val());
                if(rowDiscount == ""){
                    rowDiscount = 0;
                }
                totalDiscount = parseFloat(totalDiscount) + parseFloat(rowDiscount);
            });
            totalDiscount = totalDiscount.toFixed(2);
            if(isNaN(totalDiscount)){
                totalDiscount = 0;
            }
            totalDiscount = accounting.formatMoney(totalDiscount);
            jQuery("#discount-value").val(totalDiscount);
            /* Total tax calculation */
            var totalTax: any = 0;
            jQuery('.invoice-items').find('select[name=tax-id]').each(function(){

                var rowTaxId = jQuery(this).val();
                var rowItemUnitCost = accounting.unformat(jQuery(this).closest('tr').find('input[name=item-unit-cost]').val());
                var rowItemQty = jQuery(this).closest('tr').find('input[name=item-qty]').val();
                var rowItemDiscount = jQuery(this).closest('tr').find('input[name=item-discount]').val();
                //console.log(rowItemUnitCost+" "+rowItemQty+" "+rowItemDiscount);
                var rowTax: any = calculateService.getTaxAmount(rowItemUnitCost, rowItemQty, rowItemDiscount, rowTaxId);
                totalTax = parseFloat(totalTax) + parseFloat(rowTax);
            });
            if(isNaN(totalTax)){
                totalTax = 0;
            }
            totalTax = accounting.formatMoney(totalTax);
            jQuery('#tax-value').val(totalTax);
        });
    }

}
