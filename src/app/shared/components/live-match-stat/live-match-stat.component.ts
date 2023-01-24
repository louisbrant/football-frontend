import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatchInterface} from "../../interfaces/match.interface";


@Component({
  selector: 'app-live-match-stat',
  templateUrl: './live-match-stat.component.html',
  styleUrls: ['./live-match-stat.component.scss']
})
export class LiveMatchStatComponent implements OnInit, OnChanges{
  list: {
    performance: string,
    home: unknown,
    away: unknown
  }[]= [];

  constructor() { }
  @Input() matchData: MatchInterface | undefined;

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const home = this.matchData?.stats[0];
    const away = this.matchData?.stats[1];
    this.list = [{
        performance: 'Shots Total',
        home: home?.shots?.total,
        away: away?.shots?.total
      },
      {
        performance: 'Shots Blocked',
        home: home?.shots?.blocked,
        away: away?.shots?.blocked,
      },
      {
        performance: 'Shots Inside Box',
        home: home?.shots?.insidebox,
        away: away?.shots?.insidebox
      },
      {
        performance: 'Shots Outside Box',
        home: home?.shots?.outsidebox,
        away: away?.shots?.outsidebox
      },
      {
        performance: 'Passes Total',
        home: home?.passes?.total,
        away: away?.passes?.total,
      },
      {
        performance: 'Accurate Passes',
        home: home?.passes?.accurate,
        away: away?.passes?.accurate,
      },
      {
        performance: 'Pass Accuracy %',
        home: home?.passes?.percentage,
        away: away?.passes?.percentage
      },
      {
        performance: 'Total Attacks',
        home: home?.attacks?.attacks,
        away: away?.attacks?.attacks,
      },
      {
        performance: 'Dangerous Attacks',
        home: home?.attacks?.dangerous_attacks,
        away: away?.attacks?.dangerous_attacks,
      },
      {
        performance: 'Fouls',
        home: home?.fouls,
        away: away?.fouls
      },
      {
        performance: 'Corners',
        home: home?.corners,
        away: away?.corners
      },
      {
        performance: 'Offsides',
        home: home?.offsides,
        away: away?.offsides,
      },
      {
        performance: 'Possession Time',
        home: home?.possessiontime,
        away: home?.possessiontime,
      },
      {
        performance: 'Yellow Cards',
        home: home?.yellowcards,
        away: away?.yellowcards
      },
      {
        performance: 'Red Cards',
        home: home?.redcards,
        away: home?.redcards
      },
      {
        performance: 'Yellow Red Cards',
        home: home?.yellowredcards,
        away: away?.yellowredcards
      },
      {
        performance: 'Saves',
        home:home?.saves,
        away: away?.saves
      },
      {
        performance: 'Substitutions',
        home: home?.substitutions,
        away: away?.substitutions
      },
      {
        performance: 'Goal Kicks',
        home: home?.goal_kick,
        away: away?.goal_kick
      },
      {
        performance: 'Goal Attampts',
        home: home?.goal_attempts,
        away: away?.goal_attempts
      },
      {
        performance: 'Free Kicks',
        home: home?.free_kick,
        away: away?.free_kick
      },
      {
        performance: 'Throw Ins',
        home: home?.throw_in,
        away: away?.throw_in
      },
      {
        performance: 'Ball Safe',
        home: home?.ball_safe,
        away: away?.ball_safe,
      },
      {
        performance: 'Goals',
        home: home?.goals,
        away: away?.goals
      },
      {
        performance: 'Penalties',
        home: home?.penalties,
        away: away?.penalties
      },
      {
        performance: 'Injuries',
        home: home?.injuries,
        away: away?.injuries
      }];
  }

}
