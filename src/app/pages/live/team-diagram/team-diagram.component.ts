import { Component, Input, OnInit } from '@angular/core';
import { H2hTeams } from '../../../shared/interfaces/h2hInteresting.interface';
import { FixtureInterface } from '../../../shared/interfaces/match.interface';

@Component({
  selector: 'app-team-diagram',
  templateUrl: './team-diagram.component.html',
  styleUrls: ['./team-diagram.component.scss'],
})
export class TeamDiagramComponent implements OnInit {
  fixtures: (FixtureInterface | undefined)[] | undefined = [];
  firstTeamWinner: number = 0;
  secondTeamWinner: number = 0;
  teamDraw: number = 0;
  firstTeamLogo!: string | undefined;
  secondTeamLogo!: string | undefined;
  firstTeamPercent!: string;
  secondTeamPercent!: string;
  teamDrawPercent!: string;

  constructor() {}

  @Input() allMatches: H2hTeams[] | undefined;
  @Input() firstTeamId?: number;
  @Input() secondTeamId?: number;

  ngOnInit(): void {
    this.firstTeamLogo = this.allMatches?.find(
      (t) => t.homeTeam.id == this.firstTeamId
    )?.homeTeam.logo_path;
    this.secondTeamLogo = this.allMatches?.find(
      (t) => t.homeTeam.id == this.secondTeamId
    )?.homeTeam.logo_path;
    this.fixtures = this.allMatches
      ?.map((m) => m.stats[0]?.fixture?.data)
      .filter((f) => f);

    this.allMatches?.forEach((el) => {
      if (el.homeTeam.score > el.awayTeam.score) {
        if (el.homeTeam.id == this.firstTeamId) this.firstTeamWinner++;
        else this.secondTeamWinner++;
      } else if (el.homeTeam.score < el.awayTeam.score) {
        if (el.awayTeam.id == this.firstTeamId) this.firstTeamWinner++;
        else this.secondTeamWinner++;
      } else this.teamDraw++;
    });

    if (this.firstTeamWinner && this.allMatches?.length) {
      this.firstTeamPercent =
        ((this.firstTeamWinner * 100) / this.allMatches.length).toFixed(2) +
        '%';
    }
    if (this.secondTeamWinner && this.allMatches?.length) {
      this.secondTeamPercent =
        ((this.secondTeamWinner * 100) / this.allMatches.length).toFixed(2) +
        '%';
    }
    if (this.teamDraw && this.allMatches?.length) {
      this.teamDrawPercent =
        ((this.teamDraw * 100) / this.allMatches.length).toFixed(2) + '%';
    }
  }
}
