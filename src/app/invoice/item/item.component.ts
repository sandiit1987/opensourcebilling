import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osb-item',
  template: `
  <ng-select [allowClear]="true"
              [items]="items"
              [disabled]="disabled"
              (data)="refreshValue($event)"
              (selected)="selected($event)"
              (removed)="removed($event)"
              (typed)="typed($event)"
              placeholder="No term selected">
  </ng-select>
  `,
  styles: []
})
export class ItemComponent implements OnInit {

    private value:any = {};
    private _disabledV:string = '0';
    private disabled:boolean = false;
    private items: Array<any> = [];
    private itemsData = [
        { id: 1111, title: 'Samsung', description: 'Samsung' },
        { id: 2222, title: 'Moto', description: 'Moto' }
    ]
    public ngOnInit():any {
      this.itemsData.forEach((item:{id:number, title:string}) => {
        this.items.push({
          id: item.id,
          text: item.title
        });
      });
    }

    private get disabledV():string {
      return this._disabledV;
    }

    private set disabledV(value:string) {
      this._disabledV = value;
      this.disabled = this._disabledV === '1';
    }

    public selected(value:any):void {
      console.log('Selected value is: ', value);
    }

    public removed(value:any):void {
      console.log('Removed value is: ', value);
    }

    public typed(value:any):void {
      console.log('New search input: ', value);
    }

    public refreshValue(value:any):void {
      this.value = value;
    }

}
