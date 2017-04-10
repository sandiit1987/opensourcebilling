import { Directive, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { CalculateService } from './calculate.service';
declare var jQuery: any;
declare var accounting: any;
@Directive({
  selector: '[itemQuantity]'
})
export class ItemQuantityDirective implements OnInit {

    private elementRef: ElementRef;
    @Output() triggerEventEmitter = new EventEmitter();
    constructor(elementRef: ElementRef, private calculateService: CalculateService) {
        this.elementRef = elementRef;
        var self = this;
        
        jQuery(this.elementRef.nativeElement).on('blur', function(){
            //console.log("Blur");
            var totalRows = jQuery('.billing-item-section table tbody tr').length;
            var currentRowNumber = jQuery(this).closest('tr').index() + 1;
            if(currentRowNumber == totalRows){
                var itemDescription = jQuery(this).closest('tr').find('td:nth-child(3) input').val();
                var itemUnitCost = jQuery(this).closest('tr').find('td:nth-child(4) input').val();
                var itemQty = jQuery(this).closest('tr').find('td:nth-child(5) input').val();
                if(itemDescription != "" && itemUnitCost != "" && itemQty != ""){
                    self.triggerEventEmitter.emit("triggerClickAddItem");
                }

            }
        });
    }

    ngOnInit(){

    }
}
