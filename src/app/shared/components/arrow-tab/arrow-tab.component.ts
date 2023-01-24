import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabActiveInterface } from "../../interfaces/tab-active.interface";

@Component({
  selector: 'app-arrow-tab',
  templateUrl: './arrow-tab.component.html',
  styleUrls: ['./arrow-tab.component.scss']
})
export class ArrowTabComponent implements OnInit {
  currentActive?: TabActiveInterface;

  @Input() width: string = '1.9em'
  @Input() height: string = '1.9em'
  @Input() background: string = "#F1F1F1";


  private _actives: TabActiveInterface[] = []
  @Input() set actives(v: TabActiveInterface[]) {
    this._actives = v
    this.currentActive = this._actives.filter(v => v.isActive)[0] ?? ''
  }
  get actives(): TabActiveInterface[] {
    return this._actives
  }

  @Output() activeChanged: EventEmitter<TabActiveInterface> = new EventEmitter<TabActiveInterface>()

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  changeActive(active: TabActiveInterface) {
    if (this.currentActive != active) {
      this.activeChanged.emit(active)
      this.currentActive = active
      this.cdr.detectChanges()
    }
  }
}
