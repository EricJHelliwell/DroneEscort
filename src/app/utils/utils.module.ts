import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanizePipe } from './humanize.pipe';
import { ShortenDatePipe } from './shortendate.pipe';

@NgModule({
  declarations: [HumanizePipe, ShortenDatePipe],
  imports: [CommonModule],
  exports: [HumanizePipe, ShortenDatePipe],
})
export class UtilsModule {}
