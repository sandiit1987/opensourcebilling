export class DefaultValueService {

    private invoiceFormData: Object;
    private clients: Object[] = [];
    private terms: Object[] = [];
    private items: Object[] = [];
    private taxData: Object[] = [];
    public defaultQuantity = 1;
    public defaultUnitPrice = 0;

    public getInvoiceFormData(){
        return this.invoiceFormData = {
                company: 'Demo Company',
                invoiceNumber: 1234,
                client: null,
                invoiceDate: this.getCurrentFormattedDate(),
                term: null,
                dueDate: null,
                items: [],
                subTotal: 0,
                discountOption: 0,
                discountValue: 0,
                netTotal: 0,
                notes: ""
            }
    }
    public getClients(){
        return this.clients = [
                {
                    id: 1,
                    name: 'John',
                    company: 'TCS',
                    address: 'Kolkata'
                },
                {
                    id: 2,
                    name: 'Jason',
                    company: 'CTS',
                    address: 'Kolkata'
                },
                {
                    id: 3,
                    name: 'Sandip',
                    company: 'DAT',
                    address: 'Kolkata'
                },
                {
                    id: 4,
                    name: 'Sumantra',
                    company: 'TCS',
                    address: 'Kolkata'
                },
                {
                    id: 5,
                    name: 'Deep',
                    company: 'TCS',
                    address: 'Kolkata'
                }
            ];
    }
    public getTerms(){
        return [
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
    }
    public getItems(){
        return [
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
                id: 3,
                title: 'Sony',
                description: 'Sony'
            },
            {
                id: 4,
                title: 'One plus',
                description: 'One plus'
            },
            {
                id: 5,
                title: 'Moto',
                description: 'Moto'
            }
        ];
    }
    public getTaxData(){
        return [
                {
                    id: 1,
                    name: 'Zero',
                    value: 0
                },
                {
                    id: 2,
                    name: 'IVA',
                    value: 22
                },
                {
                    id: 3,
                    name: 'TVA',
                    value: 33
                },
                {
                    id: 4,
                    name: 'GST',
                    value: 15
                },
                {
                    id: 5,
                    name: 'Lux VAT',
                    value: 17
                }
        ];
    }
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

}
