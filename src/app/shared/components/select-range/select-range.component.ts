import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {SeasonsOfLeague} from "../../interfaces/team-profile.interface";

enum defaultSeason {
  All = 'All'
}
@Component({
  selector: 'app-select-range',
  templateUrl: './select-range.component.html',
  styleUrls: ['./select-range.component.scss']
})
export class SelectRangeComponent implements OnChanges, OnInit{

  @Input() seasons: SeasonsOfLeague[] = [];
  @Output() selectedSeason = new EventEmitter();
  @Input() curSeason: string | number |undefined;
  @Input() allSelected?: boolean;

  change() {
    if (/^\d+$/.test(<string>this.curSeason)) {
      this.selectedSeason.emit(Number(this.curSeason));
    } else {
      this.selectedSeason.emit(this.curSeason);
    }
  }

  ngOnChanges(): void {
    this.allSelected ? this.curSeason = defaultSeason.All : this.curSeason;
  }

  public initialize() {
      if (this.allSelected) {
         this.selectedSeason.emit(undefined)
      }

  }

  ngOnInit(): void {
    this.initialize();
  }
}
