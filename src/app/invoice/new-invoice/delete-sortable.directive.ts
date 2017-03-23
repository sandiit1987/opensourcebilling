import { Directive, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[deleteSortable]'
})
export class DeleteSortableDirective implements OnInit{

    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit(){
        jQuery(this.elementRef.nativeElement).on('click', function(){
            jQuery(this).parent().parent().parent().remove();
        });
    }

}
