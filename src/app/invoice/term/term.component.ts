import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osb-term',
  template: `
  <ng-select [allowClear]="true"
              [items]="terms"
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
export class TermComponent implements OnInit {

    private value:any = {};
    private _disabledV:string = '0';
    private disabled:boolean = false;
    private terms: Array<any> = [];
    private termsData = [
        { id: 12, title: 'Twise a month', description: 'Twise a month' },
        { id: 34, title: 'Once a month', description: 'Once a month' }
    ]
    public ngOnInit():any {
      this.termsData.forEach((term:{id:number, title:string}) => {
        this.terms.push({
          id: term.id,
          text: term.title
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
