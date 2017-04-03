import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '.nextInputFocus'
})
export class NextInputFocusDirective {

  constructor(private elementRef: ElementRef) {
      jQuery(elementRef.nativeElement).on("keypress", function(e){
          var code = e.keyCode || e.which;
          if(code == 13){
              jQuery(this).closest('td').next('td').find('.nextInputFocus').focus();
          }
      });
  }

}
