import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '.nextInputFocus'
})
export class NextInputFocusDirective {

  constructor(private elementRef: ElementRef) {
      jQuery(elementRef.nativeElement).on("keypress", function(e){
          var code = e.keyCode || e.which;
          //console.log(code);
          if(code == 13){
              //console.log(jQuery(this).closest('td').next('td').find('select').attr('class'));
              if(jQuery(this).closest('td').next('td').find('select').attr('class') != undefined){
                  jQuery(this).closest('td').next('td').find('.nextInputFocus').select2('open');
              }
              else{
                  jQuery(this).closest('td').next('td').find('.nextInputFocus').focus().select();
              }

              e.preventDefault();
              return false;
          }
      });
  }

}
