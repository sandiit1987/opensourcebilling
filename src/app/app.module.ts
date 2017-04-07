import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';

import { AddNewItemDirective } from './invoice/new-invoice/add-new-item.directive';
import { SortableDirective } from './invoice/new-invoice/sortable.directive';
import { InvoiceDatepickerDirective } from './invoice/new-invoice/invoice-datepicker.directive';
import { DeleteSortableDirective } from './invoice/new-invoice/delete-sortable.directive';
import { ItemUnitCostDirective } from './invoice/new-invoice/item-unit-cost.directive';
import { ItemQuantityDirective } from './invoice/new-invoice/item-quantity.directive';
import { InvoiceDetailComponent } from './invoice/invoice-detail/invoice-detail.component';
import { ItemDiscountDirective } from './invoice/new-invoice/item-discount.directive';
import { DefaultValueService } from './invoice/new-invoice/default-value.service';
import { CalculateService } from './invoice/new-invoice/calculate.service';
import { NextInputFocusDirective } from './invoice/new-invoice/next-input-focus.directive';
import { ItemDescriptionDirective } from './invoice/new-invoice/item-description.directive';
import { Select2Directive } from './invoice/new-invoice/select2.directive';
import { Select2KeypressDirective } from './invoice/new-invoice/select2-keypress.directive';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    NewInvoiceComponent,
    AddNewItemDirective,
    SortableDirective,
    InvoiceDatepickerDirective,
    DeleteSortableDirective,
    ItemUnitCostDirective,
    ItemQuantityDirective,
    InvoiceDetailComponent,
    ItemDiscountDirective,
    NextInputFocusDirective,
    ItemDescriptionDirective,
    Select2Directive,
    Select2KeypressDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DefaultValueService, CalculateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
