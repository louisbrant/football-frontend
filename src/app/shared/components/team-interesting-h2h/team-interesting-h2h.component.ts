import { Component, OnInit } from '@angular/core';
import { H2hService } from '../../services/h2h.service';
import { TeamService } from '../../services/team.service';
import { H2hInterestingInterface } from '../../interfaces/h2hInteresting.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-interesting-h2h',
  templateUrl: './team-interesting-h2h.component.html',
  styleUrls: ['./team-interesting-h2h.component.scss'],
})
export class TeamInterestingH2hComponent implements OnInit {
  fixtures: H2hInterestingInterface[] = [];
  teamName!: string;

  constructor(
    private h2hService: H2hService,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamService
      .getGeneralInfo(this.teamService.team.name)
      .subscribe((res) => {
        this.teamName = res.name;
        this.h2hService.getTeamH2h(res?.id).subscribe((teamH2h) => {
          this.fixtures = teamH2h;
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
