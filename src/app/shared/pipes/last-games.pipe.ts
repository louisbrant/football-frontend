import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'lastGames'
})
export class LastGamesPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(arr: string[] | string | undefined): SafeHtml | string[] | undefined {
    if (typeof arr === 'string') {
      arr = arr.split('');
    }
    if (arr && arr.length) {
      let str = '<div class="last-games">';
      let btn = '';
      arr.forEach(val => {
        switch (val) {
          case 'W':
            btn = `<button class="btn-win">${val}</button>`;
            break;
          case 'L':
            btn = `<button class="btn-lost">${val}</button>`;
            break;
          default:
            btn = `<button class="btn-draw">${val}</button>`;
            break;
        }
        str += btn;
      });
      str += '</div>';
      return this.sanitizer.bypassSecurityTrustHtml(str);
    }
    return arr;
  }

}
