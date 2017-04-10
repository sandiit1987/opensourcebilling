import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[itemDescription]'
})
export class ItemDescriptionDirective {
  @Output() triggerEventEmitter = new EventEmitter();
  constructor(private elementRef: ElementRef) {
      var self = this;
      jQuery(this.elementRef.nativeElement).on('keypress', function(e){

          var code = e.keyCode || e.which;
          var totalRows = jQuery('.billing-item-section table tbody tr').length;
          var currentRowNumber = jQuery(this).closest('tr').index() + 1;
          var keycode = (e.keyCode ? e.keyCode : e.which);
          var itemDescription = jQuery(this).closest('tr').find('td:nth-child(3) input').val();
          if(code == 13 && currentRowNumber == totalRows && itemDescription != ""){
              self.triggerEventEmitter.emit("triggerClickAddItem");
              e.preventDefault();
              return false;
          }
          else if(code == 13){
              e.preventDefault();
              return false;
          }
      });
  }

}
