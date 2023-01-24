import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: Array<any> | null | undefined, column: string): Array<any> | null | undefined {
    if (arr) {
      return arr.sort((a, b) => {
        if ( a[column] > b[column] ){
          return -1;
        }
        if ( a[column] < b[column] ){
          return 1;
        }
        return 0;
      });
    }
    return arr
  }

}
