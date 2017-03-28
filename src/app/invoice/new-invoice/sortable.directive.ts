import { Directive, ElementRef, AfterViewChecked } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[sortable]'
})
export class SortableDirective implements AfterViewChecked{
    private elementRef: ElementRef;
    constructor(elementRef:ElementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewChecked(){
        jQuery( this.elementRef.nativeElement ).sortable();
        jQuery( this.elementRef.nativeElement ).disableSelection();
    }
}
