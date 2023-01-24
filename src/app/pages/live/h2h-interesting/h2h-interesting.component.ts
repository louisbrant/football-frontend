import { Component, Input, OnInit } from '@angular/core';
import { H2hService } from '../../../shared/services/h2h.service';
import { forkJoin } from 'rxjs';
import { H2hInterestingInterface } from '../../../shared/interfaces/h2hInteresting.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-h2h-interesting',
  templateUrl: './h2h-interesting.component.html',
  styleUrls: ['./h2h-interesting.component.scss'],
})
export class H2hInterestingComponent implements OnInit {
  fixturesFirst: H2hInterestingInterface[] = [];
  fixturesSecond: H2hInterestingInterface[] = [];

  constructor(
    private readonly _h2hService: H2hService,
    private router: Router
  ) {}
  @Input() firstTeamId?: number;
  @Input() secondTeamId?: number;

  ngOnInit(): void {
    forkJoin([
      this._h2hService.getTeamH2h(this.firstTeamId),
      this._h2hService.getTeamH2h(this.secondTeamId),
    ]).subscribe((res) => {
      this.fixturesFirst = res[0];
      this.fixturesSecond = res[1];
    });
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['h2h', firstTeamId, secondTeamId]));
  }
}
