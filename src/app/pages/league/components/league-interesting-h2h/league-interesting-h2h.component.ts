import { Component, Input, OnInit } from '@angular/core';
import { UnsubscribeDirective } from '../../../../shared/directive/unsubscribe.directive';
import { H2hService } from '../../../../shared/services/h2h.service';
import { LeagueService } from '../../../../shared/services/league.service';
import { H2hInterestingInterface } from '../../../../shared/interfaces/h2hInteresting.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-interesting-h2h',
  templateUrl: './league-interesting-h2h.component.html',
  styleUrls: ['./league-interesting-h2h.component.scss'],
})
export class LeagueInterestingH2hComponent
  extends UnsubscribeDirective
  implements OnInit
{
  @Input() title!: string;
  fixtures: H2hInterestingInterface[] = [];

  constructor(
    private readonly h2hService: H2hService,
    private readonly leagueService: LeagueService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.leagueService
      .getGeneralInfo(this.leagueService.league.name)
      .subscribe((league) => {
        this.leagueService.getH2hByLeagueId(league?.id).subscribe((res) => {
          this.fixtures = res;
        });
      });
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router.navigate(['h2h', firstTeamId, secondTeamId]);
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }
}
