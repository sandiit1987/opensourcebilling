import { Directive, ElementRef, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
@Directive({
  selector: '[chosen]'
})
export class ChosenDirective implements AfterViewInit{
    private elementRef: ElementRef;
    @Input() selectedVal: number;
    @Output() discountOptionEvent = new EventEmitter<String>();
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {
        this.elementRef = elementRef;
    }

    ngAfterViewInit(){
        //console.log(this.selectedVal);
        var self = this;
        if(jQuery(this.elementRef.nativeElement).hasClass('without-search')){
            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true, "disable_search": true, width: '90px', inherit_select_classes: true}).change(function(){
                var taxId = jQuery(this).val();
                var discountVal = jQuery(this).closest('tr').find("input[name=item-discount]").val();
                var unitCost: any = parseFloat(jQuery(this).closest('tr').find('input[name=item-unit-cost]').val()).toFixed(2);
                if(isNaN(unitCost)){
                    unitCost = 0;
                }
                var qty = parseInt(jQuery(this).closest('tr').find('input[name=item-qty]').val());
                if(isNaN(qty)){
                    qty = 0;
                }
                var lineTotal = self.calculateService.getTotalAmount(unitCost, qty, discountVal, taxId);
                jQuery(this).closest('tr').find('div.item-cost').html(lineTotal);

                var totalCost: any = 0;
                jQuery(this).closest('.invoice-items').find('div.item-cost').each(function(){
                    var rowCost = jQuery(this).html();
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
                    var rowTax: any = self.calculateService.getTaxAmount(rowItemUnitCost, rowItemQty, rowItemDiscount, rowTaxId);
                    totalTax = parseFloat(totalTax) + parseFloat(rowTax);
                });
                if(isNaN(totalTax)){
                    totalTax = 0;
                }
                jQuery('#tax-value').val(totalTax);
                //self.discountOptionEvent.emit(discountOption);
            });
            if(self.selectedVal != undefined){
                jQuery(this.elementRef.nativeElement).val(self.selectedVal);
                jQuery(this.elementRef.nativeElement).trigger("chosen:updated");
            }

        }
        else{

            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true, width: '100%', inherit_select_classes: true});
            //console.log(this.selectedVal);
            if(self.selectedVal != undefined){
                jQuery(this.elementRef.nativeElement).val(self.selectedVal);
                jQuery(this.elementRef.nativeElement).trigger("chosen:updated");
            }

        }

    }
}
