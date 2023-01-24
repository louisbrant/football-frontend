import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { debounce, tap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { Subject, timer } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = 'Search Team';
  @Input() isMenu: boolean = false;
  @Input() size: 'short' | 'medium' = 'medium'
  @Input() showBorder = false
  @Input() listResult: any = [];

  @Input() modalTemplate!: TemplateRef<any>;
  @Input() name: string = ''
  @Input() type: string = ''

  @Input() isDebounce: boolean = false;
  @Input() debounceTime: number = 500;
  @Input() firstTeamId!: number;
  @Output() control: EventEmitter<FormControl> = new EventEmitter<FormControl>()

  @Output() eventSubmit = new EventEmitter()

  public showListResult: boolean = false;
  public focus = false;
  public searchControl: FormControl = new FormControl('');
  protected unSubscribe: Subject<void> = new Subject<void>();

  // @HostListener('window:click')
  // onClick() {
  //   this.showListResult = false;
  //   this.listResult = [];
  // }

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    if (this.isDebounce) {
      this.searchControl.valueChanges.pipe(
        tap(v => {
          this.listResult = [];
        }),
        debounce(() => timer(this.debounceTime))
      ).subscribe(result => {
        this.search();
      })
    }
  }

  search() {
    this.eventSubmit.emit(this.searchControl.value);
  }

  focusIn($event: FocusEvent) {
    this.focus = true;
    this.showListResult = true;
  }

  focusOut($event: any) {
    this.focus = false;
    this.showListResult = true;
  }

  searchLink(element: any) {
    if (this.router.url.includes('player') || (this.router.url.includes('team') && !this.firstTeamId) || this.router.url.includes('league')) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/', element.type, element.name]);
      });
    } else if (this.firstTeamId) {
      this.router.navigate(['/h2h', this.firstTeamId, element.id])
    } else {
      this.router.navigate(['/', element.type, element.name]);
    }
    this.showListResult = false;
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
