import { Directive, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[itemUnitCost]'
})
export class ItemUnitCostDirective implements OnInit {

    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit(){
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
