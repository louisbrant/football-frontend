import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() teamEmblem: string = '';
  @Input() teamName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
