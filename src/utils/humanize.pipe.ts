import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({name: 'humanizeDate'})
export class HumanizePipe implements PipeTransform {

    transform(value): any {
        return formatDistance(value, new Date(), { includeSeconds: true, addSuffix: true });
    }
}
