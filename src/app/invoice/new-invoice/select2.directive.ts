import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
declare var jQuery: any;
import { CalculateService } from './calculate.service';
@Directive({
  selector: '[select2]'
})
export class Select2Directive implements AfterViewInit{
  @Input() selectedVal: number;
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

          if(jQuery(this).attr('name') == "tax-id"){
              var taxId = jQuery(this).val();
              var discountVal = jQuery(this).closest('tr').find("input[name=item-discount]").val();
              var unitCost: any = parseFloat(jQuery(this).closest('tr').find('input[name=item-unit-cost]').val()).toFixed(2);
              if(isNaN(unitCost)){
                  unitCost = 0;
              }
              var qty = parseInt(jQuery(this).closest('tr').find('input[name=item-qty]').val());
              if(isNaN(qty)){
                  qty = 0;
              }
              var lineTotal = self.calculateService.getTotalAmount(unitCost, qty, discountVal, taxId);
              jQuery(this).closest('tr').find('div.item-cost').html(lineTotal);

              var totalCost: any = 0;
              jQuery(this).closest('.invoice-items').find('div.item-cost').each(function(){
                  var rowCost = jQuery(this).html();
                  if(rowCost == ""){
                      rowCost = 0;
                  }
                  totalCost = parseFloat(totalCost) + parseFloat(rowCost);

              });
              totalCost = totalCost.toFixed(2);
              jQuery("#item-net-total").html("$"+totalCost);

              /* Total tax calculation */
              var totalTax: any = 0;
              jQuery('.invoice-items').find('select[name=tax-id]').each(function(){

                  var rowTaxId = jQuery(this).val();
                  var rowItemUnitCost = jQuery(this).closest('tr').find('input[name=item-unit-cost]').val();
                  var rowItemQty = jQuery(this).closest('tr').find('input[name=item-qty]').val();
                  var rowItemDiscount = jQuery(this).closest('tr').find('input[name=item-discount]').val();
                  //console.log(rowItemUnitCost+" "+rowItemQty+" "+rowItemDiscount);
                  var rowTax: any = self.calculateService.getTaxAmount(rowItemUnitCost, rowItemQty, rowItemDiscount, rowTaxId);
                  totalTax = parseFloat(totalTax) + parseFloat(rowTax);
              });
              if(isNaN(totalTax)){
                  totalTax = 0;
              }
              jQuery('#tax-value').val(totalTax);
          }
      });
      console.log(self.selectedVal);
      if(self.selectedVal != undefined){
          jQuery(this.elementRef.nativeElement).val(self.selectedVal);
          jQuery(this.elementRef.nativeElement).trigger("change");
      }
  }

}
