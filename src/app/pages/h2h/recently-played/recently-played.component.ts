import { Component, Input, OnInit } from '@angular/core';
import { H2hService } from '../../../shared/services/h2h.service';
import { forkJoin } from 'rxjs';
import { LoaderState } from '../../../shared/interfaces/team-profile.interface';
import { H2hTeams } from "../../../shared/interfaces/h2hInteresting.interface";
import {
  RecentlyPlayedInterface,
  RecentlyPlayedLatestInterface,
} from '../../../shared/interfaces/league.interface';
import { TeamService } from 'src/app/shared/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss'],
})
export class RecentlyPlayedComponent implements OnInit {
  listFirst: RecentlyPlayedInterface | undefined;
  listFirstSelected: RecentlyPlayedLatestInterface[] | undefined;
  listSecondSelected: RecentlyPlayedLatestInterface[] | undefined;
  listSecond: RecentlyPlayedInterface | undefined;
  loaderState: LoaderState = {
    val: false,
  };
  pageFirst = 0;
  countFirst = 10;
  pageSecond = 0;
  countSecond = 10;

  public events!: H2hTeams[] | undefined;
  public allEvents: H2hTeams[] | undefined;

  constructor(
    private readonly _h2hService: H2hService,
    private teamService: TeamService,
    private router: Router
  ) { }
  @Input() firstTeamId?: number;
  @Input() secondTeamId?: number;
  @Input() allMatches?: H2hTeams[] | undefined;

  moreAllTeam() {
    this.moreFirstTeam();
    this.moreSecondTeam();
  }
  moreFirstTeam() {
    this.loaderState = {
      val: false,
    };
    this.pageFirst += 1;
    this.listFirstSelected = this.listFirst?.latest.filter(
      (_: any, i: number) => this.pageFirst * this.countFirst > i
    );
    this.listFirstSelected?.forEach((item) => {
      let opponentTeamId =
        item.localteam_id == this.firstTeamId
          ? item.visitorteam_id
          : item.localteam_id;
      this.teamService.getSecondaryInfo(opponentTeamId).subscribe((res) => {
        // console.log(res);
        item.opponent_name = res.name;
        item.opponent_id = res.teamId;
      });
    });
  }

  moreSecondTeam() {
    this.loaderState = {
      val: false,
    };
    this.pageSecond += 1;
    this.listSecondSelected = this.listSecond?.latest?.filter(
      (_: any, i: number) => this.pageSecond * this.countSecond > i
    );
    this.listSecondSelected?.forEach((item) => {
      let opponentTeamId =
        item.localteam_id == this.secondTeamId
          ? item.visitorteam_id
          : item.localteam_id;
      this.teamService.getSecondaryInfo(opponentTeamId).subscribe((res) => {
        item.opponent_name = res.name;
        item.opponent_id = res.teamId;
      });
    });
  }

  ngOnInit(): void {
    this.allMatches;
    // console.log(this.allMatches);
    forkJoin([
      this._h2hService.firstTeamRecentlyPlayed(this.firstTeamId, false),
      this._h2hService.firstTeamRecentlyPlayed(this.secondTeamId, false),
    ]).subscribe((res: any[]) => {
      this.listFirst = res[0];
      this.listSecond = res[1];
      this.moreFirstTeam();
      this.moreSecondTeam();
    });
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }
}
