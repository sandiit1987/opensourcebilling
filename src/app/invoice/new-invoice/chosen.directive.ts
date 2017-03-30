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
            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true, "disable_search": true, width: '90px'}).change(function(){
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
                //self.discountOptionEvent.emit(discountOption);
            });
            if(self.selectedVal != undefined){
                jQuery(this.elementRef.nativeElement).val(self.selectedVal);
                jQuery(this.elementRef.nativeElement).trigger("chosen:updated");
            }

        }
        else{

            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true, width: '100%'});
            //console.log(this.selectedVal);
            if(self.selectedVal != undefined){
                jQuery(this.elementRef.nativeElement).val(self.selectedVal);
                jQuery(this.elementRef.nativeElement).trigger("chosen:updated");
            }

        }

    }
}
