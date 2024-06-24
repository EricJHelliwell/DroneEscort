import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({name: 'shortenDate'})
export class ShortenDatePipe implements PipeTransform {

    transform(value): any {
        const dateNow = new Date();
        const dateNowDate = new Date(dateNow.toDateString());
        const dateCompare = new Date(value);
        const dateCompareDate = new Date(dateCompare.toDateString());
        if (dateNowDate.getTime() == dateCompareDate.getTime()) {
            return format(dateCompare,"h:mm aaa");
            }
        else {
            return format(dateCompare,"L/d/yyyy h:mm aaa");
        }
    }
}
