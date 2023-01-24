import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cups'
})
export class CupsPipe implements PipeTransform {

  transform(value: number): string | number {
    if (!value) {
      return value
    }
    return `${value} <i class="icon icon-cup"></i>`;
  }

}
