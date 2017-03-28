import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[osbAddNewItem]'
})
export class AddNewItemDirective {
    //clonedHtml = '';
    private clonedHtml;
  constructor(elementRef: ElementRef) {

      //this.clonedHtml = elementRef.nativeElement.parentNode.parentNode.parentNode.children[0].cloneNode(true);
      //console.log(this.clonedHtml);
      jQuery(elementRef.nativeElement).click(function(){
          //this.clonedHtml = jQuery(elementRef.nativeElement).parent().parent().parent().find('tr:first').clone();
          //jQuery(elementRef.nativeElement).parent().parent().parent().find('tr:last').insertAfter(this.clonedHtml);
          //jQuery(this.clonedHtml).insertBefore('.no_hover');
      });
  }

}
