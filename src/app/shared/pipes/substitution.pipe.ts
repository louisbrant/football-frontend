import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'substitution'
})
export class SubstitutionPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ){}

  transform(value: number, isIn: boolean = false): null | SafeHtml {
    if (value) {
      const str = `${value}’<i class="icon icon-${isIn ? 'in': 'out'}"></i>`;
      return this.sanitizer.bypassSecurityTrustHtml(str)
    }
    return null;
  }

}
