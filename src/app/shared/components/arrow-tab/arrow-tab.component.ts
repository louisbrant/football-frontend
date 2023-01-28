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


  private _actives: any[] = [];

  @Input() set actives(v: any[]) {
    this._actives = v
    this.currentActive = this._actives.filter(v => v.isActive)[0] ?? ''
  }
  public windowtype: any = 1;
  get actives(): any[] {
    return this._actives
  }

  @Output() activeChanged: EventEmitter<TabActiveInterface> = new EventEmitter<TabActiveInterface>()

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("window.innerWidth======>", window.innerWidth);
    if (window.innerWidth < (770 - 100)) {
      this.windowtype = 4;
      if (window.innerWidth < (540 - 100)) {
        this.windowtype = 3;
      }
    }
    console.log("this.windowtype=>", this.windowtype);
    let newactives: any = [], newchildrenactives: any = [], i: any = 0;
    this.actives.map(item => {
      i++;
      newchildrenactives.push(item);
      if (this.windowtype == 1) {
        if (i == this.actives.length) {
          newactives.push(newchildrenactives);
          newchildrenactives = [];
        }
      }
      else {
        if (i % this.windowtype == 0) {
          newactives.push(newchildrenactives);
          newchildrenactives = [];
        }
        if (i == this.actives.length) {
          if (newchildrenactives.length) {
            newactives.push(newchildrenactives);
          }
        }
      }
    })
    this.actives = newactives;
    console.log("this.actives=>", this.actives);
  }

  changeActive(active: TabActiveInterface) {
    if (this.currentActive != active) {
      this.activeChanged.emit(active)
      this.currentActive = active
      this.cdr.detectChanges()
    }
  }
}
