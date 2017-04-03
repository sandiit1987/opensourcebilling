import { Directive, ElementRef, OnInit } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
@Directive({
  selector: '[itemUnitCost]'
})
export class ItemUnitCostDirective implements OnInit {

    private elementRef: ElementRef;
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {
        this.elementRef = elementRef;
        jQuery(this.elementRef.nativeElement).on('keyup', function(){

            var unitCost: any = parseFloat(jQuery(this).val()).toFixed(2);
            if(isNaN(unitCost)){
                unitCost = 0;
            }
            //console.log(unitCost);
            var qty = parseInt(jQuery(this).parent().parent().find('input[name=item-qty]').val());
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

            /* Total tax calculation */
            var totalTax: any = 0;
            jQuery('.invoice-items').find('select[name=tax-id]').each(function(){

                var rowTaxId = jQuery(this).val();
                var rowItemUnitCost = jQuery(this).closest('tr').find('input[name=item-unit-cost]').val();
                var rowItemQty = jQuery(this).closest('tr').find('input[name=item-qty]').val();
                var rowItemDiscount = jQuery(this).closest('tr').find('input[name=item-discount]').val();
                //console.log(rowItemUnitCost+" "+rowItemQty+" "+rowItemDiscount);
                var rowTax: any = calculateService.getTaxAmount(rowItemUnitCost, rowItemQty, rowItemDiscount, rowTaxId);
                totalTax = parseFloat(totalTax) + parseFloat(rowTax);
            });
            if(isNaN(totalTax)){
                totalTax = 0;
            }
            jQuery('#tax-value').val(totalTax);
        });
    }
    ngOnInit(){

    }
}
