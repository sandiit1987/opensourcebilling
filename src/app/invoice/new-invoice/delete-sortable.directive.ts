import { Directive, ElementRef, OnInit } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
@Directive({
  selector: '[deleteSortable]'
})
export class DeleteSortableDirective implements OnInit{

    private elementRef: ElementRef;
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {
        this.elementRef = elementRef;
        jQuery(this.elementRef.nativeElement).on('click', function(){
            jQuery(this).parent().parent().parent().remove();
            var totalCost: any = 0;
            jQuery('.invoice-items').find('input[name=item-cost]').each(function(){
                var rowCost = jQuery(this).val();
                if(rowCost == ""){
                    rowCost = 0;
                }
                totalCost = parseFloat(totalCost) + parseFloat(rowCost);
            });
            totalCost = totalCost.toFixed(2);
            jQuery("#item-net-total").html("$"+totalCost);

            /* Total discount calculation */
            var totalDiscount: any = 0;
            jQuery('.invoice-items').find('input[name=item-discount]').each(function(){
                var rowDiscount = jQuery(this).val();
                if(rowDiscount == ""){
                    rowDiscount = 0;
                }
                totalDiscount = parseFloat(totalDiscount) + parseFloat(rowDiscount);
            });
            totalDiscount = totalDiscount.toFixed(2);
            console.log("totalDiscount");
            console.log(totalDiscount);
            if(isNaN(totalDiscount)){
                totalDiscount = 0;
            }
            jQuery("#discount-value").val(totalDiscount);
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
