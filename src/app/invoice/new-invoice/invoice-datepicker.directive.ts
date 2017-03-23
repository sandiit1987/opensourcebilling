import { Directive, ElementRef, AfterViewChecked } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[invoiceDatepicker]'
})
export class InvoiceDatepickerDirective implements AfterViewChecked {
    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewChecked(){
        jQuery(this.elementRef.nativeElement).datepicker({ dateFormat: 'dd/mm/yy' });
    }
}
