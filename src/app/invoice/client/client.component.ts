import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osb-client',
  template: `
  <ng-select [allowClear]="true"
              [items]="clients"
              [disabled]="disabled"
              (data)="refreshValue($event)"
              (selected)="selected($event)"
              (removed)="removed($event)"
              (typed)="typed($event)"
              placeholder="No client selected">
  </ng-select>
  `,
  styles: []
})
export class ClientComponent implements OnInit {

    private value:any = {};
    private _disabledV:string = '0';
    private disabled:boolean = false;
    private clients:Array<any> = [];
    private clientsData = [
        { id: 1, name: 'Sandip', company: "DAT", address: 'Kolkata Sec 5'},
        { id: 2, name: 'Deep', company: "TCS", address: 'New Town'}
    ];
    public ngOnInit():any {
      this.clientsData.forEach((color:{id:number, name:string, company: string, address: string}) => {
        this.clients.push({
          id: color.id,
          text: color.name
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
