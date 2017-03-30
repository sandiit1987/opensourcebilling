import { Directive, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[deleteSortable]'
})
export class DeleteSortableDirective implements OnInit{

    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
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
        });
    }
    ngOnInit(){

    }

}
