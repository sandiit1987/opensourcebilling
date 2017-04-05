import { Injectable } from '@angular/core';
import { DefaultValueService } from './default-value.service';
declare var accounting: any;
@Injectable()
export class CalculateService {

    constructor(private defaultValueService: DefaultValueService){

    }
    public getDiscountAmount(unitCost: any, qty: any, discount: any){
        var cost = unitCost * qty;
        if(this.percentageExistInDiscountAmount(discount)){
            //discount = discount.substring(0, discount.length - 1);
            discount = accounting.unformat(discount);
            return (cost * discount) / 100;
        }
        else{
            return accounting.unformat(discount);
        }
    }
    public getDiscountPercentage(unitCost: any, qty: any, discount: any){
        if(!isNaN(discount)){
            var cost = unitCost * qty;
            if(!this.percentageExistInDiscountAmount(discount)){
                if(cost > 0){
                    return (discount / cost) * 100;
                }
                else{
                    return undefined;
                }
            }
            else{
                return discount;
            }
        }
        else{
            return undefined;
        }

    }
    public getTotalAmount(unitCost: any, qty: any, discount: any, tax: any){
        //console.log("OKK");
        var costAfterDiscount = (unitCost * qty) - discount;
        var taxValue;
        if(tax != ""){
            //console.log("Not Null");
            var taxData = this.defaultValueService.getTaxData();
            for (var i=0; i < taxData.length; i++) {
                //console.log(taxData[i].id);
                if (taxData[i].id == tax) {
                    taxValue = taxData[i].value;
                    break;
                }
            }
        }
        else{
            taxValue = 0;
            //console.log("NULL");
        }
        var taxAmount = (taxValue * costAfterDiscount) / 100;
        var totalAmount = costAfterDiscount + taxAmount;
        if(isNaN(totalAmount)){
            totalAmount = 0;
        }
        return accounting.formatMoney(totalAmount);
        //return totalAmount.toFixed(2);
        //console.log(taxValue);
        //console.log(taxAmount);
    }
    public getTaxAmount(unitCost: any, qty: any, discount: any, tax: any){
        var costAfterDiscount = (unitCost * qty) - discount;
        var taxValue;
        if(tax != ""){
            //console.log("Not Null");
            var taxData = this.defaultValueService.getTaxData();
            for (var i=0; i < taxData.length; i++) {
                //console.log(taxData[i].id);
                if (taxData[i].id == tax) {
                    taxValue = taxData[i].value;
                    break;
                }
            }
        }
        else{
            taxValue = 0;
            //console.log("NULL");
        }
        var taxAmount = (taxValue * costAfterDiscount) / 100;
        return taxAmount;
    }
    public percentageExistInDiscountAmount(discount: any){
        var expr = /%/;
        if(expr.test(discount)){
            return true;
        }
        else{
            return false;
        }
    }

}
