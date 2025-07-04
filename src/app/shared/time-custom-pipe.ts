import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeCustom'
})
export class TimeCustomPipe implements PipeTransform {

  transform(mins: number): string {
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  }

}
