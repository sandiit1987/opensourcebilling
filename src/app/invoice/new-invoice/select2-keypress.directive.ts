import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[select2Keypress]'
})
export class Select2KeypressDirective {

  constructor(private elementRef: ElementRef) {
      jQuery(document).on('keyup', '.select2-search input', function(e){
          var code = e.keyCode || e.which;
          //console.log(code);
          var selectValue = jQuery(this).closest('td').find('select').val()[0];
          if(code == 13){
              if(jQuery(this).closest('td').next('td').find('.nextInputFocus').attr('class') == undefined && selectValue != undefined){
                  jQuery(this).closest('tr').next('tr').find('td:nth-child(2)').find('.nextInputFocus').select2('open');
              }
              else{
                  if(selectValue != undefined){
                      jQuery(this).closest('td').next('td').find('.nextInputFocus').focus().select();
                  }
              }
          }
      });
  }

}
