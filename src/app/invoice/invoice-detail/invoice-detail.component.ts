import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osb-invoice-detail',
  templateUrl: './invoice-detail.component.html'
})
export class InvoiceDetailComponent implements OnInit {

  @Input() invoiceData: Object;
  @Input() clients: Object;
  @Input() terms: Object;
  @Input() items: Object;

  private selectedClient;

  constructor() { }

  ngOnInit() {
      
  }

}
