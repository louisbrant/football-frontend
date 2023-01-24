import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmaker',
  templateUrl: './bookmaker.component.html',
  styleUrls: ['./bookmaker.component.scss']
})
export class BookmakerComponent implements OnInit {

  @Input() home?: string = '';
  @Input() homeEmblem?: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
