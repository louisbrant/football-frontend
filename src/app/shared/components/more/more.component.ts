import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoaderState} from "../../interfaces/team-profile.interface";

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {
  @Input() loaderState: LoaderState = {
    val: false
  };
  @Output() getMore = new EventEmitter();

  more() {
    this.loaderState = {
      val: true
    };
    this.getMore.emit()
  }
}
