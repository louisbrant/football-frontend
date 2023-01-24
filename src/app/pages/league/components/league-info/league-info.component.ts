import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LeagueService } from '../../../../shared/services/league.service';
import {
  GeneralInfoLeague,
  PastChampions,
  SeachLeague,
} from '../../../../shared/interfaces/league.interface';
import { UnsubscribeDirective } from '../../../../shared/directive/unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { SeasonsOfLeague } from '../../../../shared/interfaces/team-profile.interface';

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.scss'],
})
export class LeagueInfoComponent
  extends UnsubscribeDirective
  implements OnInit, OnChanges
{
  leagueInfo!: GeneralInfoLeague;
  pastChampions: PastChampions[] = [];

  constructor(private readonly leagueService: LeagueService) {
    super();
  }

  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() league!: SeachLeague | null;

  ngOnChanges(changes: SimpleChanges): void {
    const seasonsIds = changes['seasons']?.currentValue?.map(
      (season: { seasonId: number }) => season.seasonId
    );
    this.initializeValue(seasonsIds);
  }

  ngOnInit(): void {
    this.getGeneralInfo();
  }

  private getGeneralInfo() {
    this.leagueService
      .getGeneralInfo(this.leagueService.league.name)
      .pipe(takeUntil(this.subscription))
      .subscribe((res) => {
        this.leagueInfo = res;
        this.selectedSeason(this.leagueService.league.currentSeasonId);
      });
  }

  selectedSeason(seasonId: number) {
    this.leagueService.seasonStartEndDate(seasonId).subscribe((res) => {
      this.leagueInfo.seasonsDates = res;
    });
  }

  initializeValue(seasonsIds: number[]) {
    this.leagueService.pastChampions(seasonsIds).subscribe((res) => {
      this.pastChampions = res.reverse().slice(1);
    });
  }
}
