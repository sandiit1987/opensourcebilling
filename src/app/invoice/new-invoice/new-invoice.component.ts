import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, ComponentFactoryResolver } from '@angular/core';


@Component({
  selector: 'osb-new-invoice',
  templateUrl: './new-invoice.component.html'
})
export class NewInvoiceComponent {
    @ViewChild('clone') template;

    @ViewChild('container', {read:ViewContainerRef}) container;
    invoiceFormData = {
        company: 'Demo Company',
        invoiceNumber: 1234,
        client: null,
        invoiceDate: this.getCurrentFormattedDate(),
        term: null,
        dueDate: null,
        items: []
    }
    private clients = [
            {
                id: 1,
                name: 'John',
                company: 'TCS',
                address: 'Kolkata'
            },
            {
                id: 1,
                name: 'Jason',
                company: 'CTS',
                address: 'Kolkata'
            },
            {
                id: 1,
                name: 'Sandip',
                company: 'DAT',
                address: 'Kolkata'
            },
            {
                id: 1,
                name: 'Sumantra',
                company: 'TCS',
                address: 'Kolkata'
            },
            {
                id: 1,
                name: 'Deep',
                company: 'TCS',
                address: 'Kolkata'
            }
    ];
    private terms = [
            {
                id: 1,
                title: 'Annual',
                description: 'Annual'
            },
            {
                id: 2,
                title: 'Monthly',
                description: 'Monthly'
            },
            {
                id: 3,
                title: 'Twice in month',
                description: 'Twice in month'
            }
    ];
    private items = [
            {
                id: 1,
                title: 'Samsung',
                description: 'Samsung'
            },
            {
                id: 2,
                title: 'Nokia',
                description: 'Nokia'
            },
            {
                id: 1,
                title: 'Sony',
                description: 'Sony'
            },
            {
                id: 1,
                title: 'One plus',
                description: 'One plus'
            },
            {
                id: 1,
                title: 'Moto',
                description: 'Moto'
            }
    ];


    private getCurrentFormattedDate(){
         var today: any = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();
         if(dd<10) {
             dd='0'+dd
         }
         if(mm<10) {
             mm='0'+mm
         }
         today = dd+'/'+mm+'/'+yyyy;
         return today;
    }

    constructor(private resolver:ComponentFactoryResolver){}


    cloneTemplate(){
        this.container.createEmbeddedView(this.template);
    }
    triggerCall(){
        alert('OK');
    }
}
