import { Directive, ElementRef, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[chosen]'
})
export class ChosenDirective implements AfterViewInit{
    private elementRef: ElementRef;
    @Input() selectedVal: number;
    @Output() discountOptionEvent = new EventEmitter<String>();
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngAfterViewInit(){
        var self = this;
        if(jQuery(this.elementRef.nativeElement).hasClass('without-search')){
            jQuery(this.elementRef.nativeElement).chosen({allow_single_deselect:true, "disable_search": true, width: '60px'}).change(function(){
                var discountOption = jQuery(this).val();
                self.discountOptionEvent.emit(discountOption);
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
