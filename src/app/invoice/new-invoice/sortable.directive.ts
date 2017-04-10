import { Directive, ElementRef, AfterViewChecked, EventEmitter, Output } from '@angular/core';
declare var jQuery: any;
@Directive({
  selector: '[sortable]'
})
export class SortableDirective implements AfterViewChecked{
    private elementRef: ElementRef;
    private sortObject: any = {};
    @Output() sortingRowsOnUpdate = new EventEmitter<Object>();
    constructor(elementRef:ElementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewChecked(){
        var self = this;
        jQuery( this.elementRef.nativeElement ).sortable({
            start: function(event, ui) {
                self.sortObject.oldIndex = ui.item.index();
            },
           update: function(event, ui) {
               self.sortObject.newIndex = ui.item.index();
               self.sortingRowsOnUpdate.emit(self.sortObject);
           }
        });
        jQuery( this.elementRef.nativeElement ).disableSelection();
    }
}
