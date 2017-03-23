import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';
import { SelectModule } from 'ng2-select';
import { ClientComponent } from './invoice/client/client.component';
import { TermComponent } from './invoice/term/term.component';
import { ItemComponent } from './invoice/item/item.component';
import { AddNewItemDirective } from './invoice/new-invoice/add-new-item.directive';
import { SortableDirective } from './invoice/new-invoice/sortable.directive';
import { ChosenDirective } from './invoice/new-invoice/chosen.directive';
import { InvoiceDatepickerDirective } from './invoice/new-invoice/invoice-datepicker.directive';
import { DeleteSortableDirective } from './invoice/new-invoice/delete-sortable.directive';
import { ItemUnitCostDirective } from './invoice/new-invoice/item-unit-cost.directive';
import { ItemQuantityDirective } from './invoice/new-invoice/item-quantity.directive';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    NewInvoiceComponent,
    ClientComponent,
    TermComponent,
    ItemComponent,
    AddNewItemDirective,
    SortableDirective,
    ChosenDirective,
    InvoiceDatepickerDirective,
    DeleteSortableDirective,
    ItemUnitCostDirective,
    ItemQuantityDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
