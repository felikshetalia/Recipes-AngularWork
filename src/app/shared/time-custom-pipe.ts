import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeCustom'
})
export class TimeCustomPipe implements PipeTransform {

  transform(hrs: number, mins: number): string {
    return '${hrs}h ${mins}m';
  }

}
