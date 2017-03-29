import { Component } from '@angular/core';

@Component({
  selector: 'osb-invoice',
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent{
    private invoiceData: Object;
    private clients: Object;
    private terms: Object;
    private items: Object;
    private taxData: Object;
    getPassingInvoiceData(data: Object){
        //console.log("Received");
        //console.log(data);
        this.invoiceData = data;
    }
    getPassingClientData(clients: Object){
        this.clients = clients;
    }
    getPassingTermData(terms: Object){
        this.terms = terms;
    }
    getPassingItemData(items: Object){
        this.items = items;
    }
    getPassingTaxData(taxData: Object){
        this.taxData = taxData;
    }
}
