import { Directive, ElementRef, AfterViewChecked } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[chosen]'
})
export class ChosenDirective implements AfterViewChecked{
    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewChecked(){
        if(jQuery(this.elementRef.nativeElement).hasClass('without-search')){
            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true, "disable_search": true});
        }
        else{
            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true});
        }

    }
}
