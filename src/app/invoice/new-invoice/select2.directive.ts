import { Directive, ElementRef, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
declare var jQuery: any;
declare var accounting: any;
import { CalculateService } from './calculate.service';
@Directive({
  selector: '[select2]'
})
export class Select2Directive implements AfterViewInit{
  @Input() selectedVal: number;
  @Output() select2Event = new EventEmitter<Object>();
  constructor(private elementRef: ElementRef, private calculateService: CalculateService) {

  }
  ngAfterViewInit(){
      var self = this;
      var placeholderText = jQuery(self.elementRef.nativeElement).attr('data-placeholder');

      jQuery(self.elementRef.nativeElement).select2({
          placeholder: placeholderText,
          maximumSelectionLength: 1
      });
      jQuery(self.elementRef.nativeElement).on('change', function(){
          var rowIndex = jQuery(this).attr('id');
          var rowObject: any = {};
          if(jQuery(this).hasClass('rowItemId')){
              var itemId = jQuery(this).val();
              rowObject.rowIndex = rowIndex;
              rowObject.itemId = itemId[0] || "";
          }
          if(jQuery(this).hasClass('rowTaxId')){
              var taxId = jQuery(this).val();
              rowObject.rowIndex = rowIndex;
              rowObject.taxId = taxId[0] || "";
          }
          if(jQuery(this).hasClass('termId')){
              var termId = jQuery(this).val();
              rowObject.termId = termId[0];
          }
          if(jQuery(this).hasClass('clientId')){
              var clientId = jQuery(this).val();
              rowObject.clientId = clientId[0];
          }
          self.select2Event.emit(rowObject);
      });
      if(self.selectedVal != undefined){
         jQuery(this.elementRef.nativeElement).val(self.selectedVal);
         jQuery(this.elementRef.nativeElement).trigger("change");
     }
  }

}
