import { Component } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { DetailStats } from '../../interfaces/stats.interface';
import { TabActiveInterface } from "../../interfaces/tab-active.interface";
import { setPositionColor } from '../../helper/result-position';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FilterLeagueDirective } from '../../directive/filterLeague.directive';
import { Router } from '@angular/router';

interface Detail {
  [key: string]: string | number | undefined;
  position: number;
  name: string;
  logo_path: string;
  pastBTTS: number;
  nextMatch: string;
  predictionBTTS: number;
  homeAwayOver: string;
  ourPredictionOver: number;
  homeAwayUnder: string;
  ourPredictionUnder: number;
  totalFTS: number | string | undefined;
  homeAwayFTS: string;
  totalCleanSheet: number | string | undefined;
  homeAwayCleanSheet: string;
  totalCorners: number;
  avPerGame: string;
  red: number;
  yellow: number;
  class?: string;
}

enum DetailedTypes {
  BTTS = 'btts',
  OVER = 'over',
  UNDER = 'under',
  FTS = 'fts',
  CLEAN_SHEET = 'cleanSheet',
  CORNERS = 'corners',
  CARDS = 'cards',
}

enum CardTypes {
  RED = 'Red',
  YELLOW = 'Yellow',
}

interface DetailedColumns {
  headers: string[];
  data: string[];
}

interface Columns {
  [key: string]: DetailedColumns;
  btts: DetailedColumns;
  over: DetailedColumns;
  under: DetailedColumns;
  fts: DetailedColumns;
  cleanSheet: DetailedColumns;
  corners: DetailedColumns;
  cards: DetailedColumns;
}

@Component({
  selector: 'app-detailed-stat',
  templateUrl: './detailed-stat.component.html',
  styleUrls: ['./detailed-stat.component.scss'],
})
export class DetailedStatComponent extends FilterLeagueDirective {
  detailedTypes = DetailedTypes;
  cardTypes = CardTypes;


  activeGroups: TabActiveInterface[] = [
    { name: 'BTTS', active: 'btts', isActive: true },
    { name: 'OVER 2.5', active: 'over', isActive: true },
    { name: 'Under 2.5', active: 'under', isActive: true },
    { name: 'FTS', active: 'fts', isActive: true },
    { name: 'CLEAN SHEET', active: 'cleanSheet', isActive: true },
    { name: 'CORNERS', active: 'corners', isActive: true },
    { name: 'CARDS', active: 'cards', isActive: true },
  ]



  public changeActiveGroup(active: TabActiveInterface) {
    if (active.active !== this.currentType) {
      this.currentType = active.active;
    }

  }

  public sizeOfArrowTabGroupwidth = '8.5em';
  public sizeOfArrowTabGroupbag = 'fst';


  currentType: string = 'btts';
  columns: Columns = {
    btts: {
      headers: ['Past BTTS %', 'Next Match', 'BTTS Prediction'],
      data: ['pastBTTS', 'nextMatch', 'predictionBTTS'],
    },
    over: {
      headers: ['Home - Away', 'Next Match', 'Our Prediction'],
      data: ['homeAwayOver', 'nextMatch', 'ourPredictionOver'],
    },
    under: {
      headers: ['Home - Away', 'Next Match', 'Our Prediction'],
      data: ['homeAwayUnder', 'nextMatch', 'ourPredictionUnder'],
    },
    fts: {
      headers: ['Total', 'Home - Away', 'Next Match'],
      data: ['totalFTS', 'homeAwayFTS', 'nextMatch'],
    },
    cleanSheet: {
      headers: ['Total', 'Home - Away', 'Next Match'],
      data: ['totalCleanSheet', 'homeAwayCleanSheet', 'nextMatch'],
    },
    corners: {
      headers: ['Total', 'Av Per Game', 'Next Match'],
      data: ['totalCorners', 'avPerGame', 'nextMatch'],
    },
    cards: {
      headers: ['Red', 'Next Match', 'Yellow'],
      data: ['red', 'nextMatch', 'yellow'],
    },
  };
  detailedStats: Detail[] = [];
  constructor(
    protected override readonly leagueService: LeagueService,
    private router: Router
  ) {
    super(leagueService);
  }

  protected override getData() {
    this.subject$
      .asObservable()
      .pipe(
        switchMap(() =>
          this.leagueService.getDetailStats(
            this.leagueService.league.id,
            this.curSeason
          )
        ),
        takeUntil(this.subscription)
      )
      .subscribe(
        (res: DetailStats[]) => {
          this.detailedStats = res?.map((item) => {
            return {
              position: item.position,
              name: item.name,
              logo_path: item.logo_path,
              pastBTTS: 0,
              nextMatch: '',
              predictionBTTS: item.stats.btts,
              homeAwayOver: `${item.stats.over_2_5.home}-${item.stats.over_2_5.away}`,
              ourPredictionOver: 0,
              homeAwayUnder: `${item.stats.under_2_5.home}-${item.stats.under_2_5.away}`,
              ourPredictionUnder: 0,
              totalFTS: item.stats.failedToScore.total,
              homeAwayFTS: `${item.stats.failedToScore.home}-${item.stats.failedToScore.away}`,
              totalCleanSheet: item.stats.cleanSheet.total,
              homeAwayCleanSheet: `${item.stats.cleanSheet.home}-${item.stats.cleanSheet.away}`,
              totalCorners: item.stats.corners.total,
              avPerGame: item.stats.corners.avPerGame,
              red: item.stats.cards.red,
              yellow: item.stats.cards.yellow,
              class: setPositionColor(item.name),
            };
          });
          this.loaderState = { val: false };
        },
        () => (this.loaderState = { val: false })
      );
  }

  showTable(value: string) {
    if (value !== this.currentType) {
      this.currentType = value;
    }
  }

  sortByCard(item: string) {
    if (item === this.cardTypes.RED) {
      this.detailedStats = this.detailedStats.sort((a, b) => b.red - a.red);
    } else {
      this.detailedStats = this.detailedStats.sort((a, b) => b.yellow - a.yellow);
    }
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }
}
