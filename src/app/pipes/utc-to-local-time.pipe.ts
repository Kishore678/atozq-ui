import { Pipe, PipeTransform } from '@angular/core';
import { UtcConverterService } from './utc-converter.service';

@Pipe({
    name: 'utcToLocalTime',
})
export class UtcToLocalTimePipe implements PipeTransform {
    
    constructor(private _dateConverter: UtcConverterService) {
    }

    transform(date: string, args?: any): string {
        return this._dateConverter.convertUtcToLocalTime(date, args);
    }
}


// <div>
//     utcToLocalTime full: {{testUtc | utcToLocalTime:'full'}}
// </div>
// <div>
//     utcToLocalTime short: {{testUtc | utcToLocalTime:'short'}} recommended
// </div>
// <div>
//     utcToLocalTime shortDate: {{testUtc | utcToLocalTime:'shortDate'}}
// </div>
// <div>
//     utcToLocalTime shortTime: {{testUtc | utcToLocalTime:'shortTime'}}
// </div>
