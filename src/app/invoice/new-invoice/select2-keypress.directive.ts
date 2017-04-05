import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[select2Keypress]'
})
export class Select2KeypressDirective {

  constructor(private elementRef: ElementRef) {
      jQuery(document).on('keyup', '.select2-search input', function(e){
          var code = e.keyCode || e.which;
          if(code == 13){
              //console.log(jQuery(this).closest('td').next('td').find('.nextInputFocus').attr('class'));
              jQuery(this).closest('td').next('td').find('.nextInputFocus').focus().select();
          }
      });
  }

}
