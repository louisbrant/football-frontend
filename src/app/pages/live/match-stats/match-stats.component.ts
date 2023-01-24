import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {H2hTeams} from "../../../shared/interfaces/h2hInteresting.interface";
import {StateInterface} from "../../../shared/interfaces/match.interface";

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss']
})
export class MatchStatsComponent implements OnInit, OnChanges {
  matchStates: H2hTeams[] | undefined;
  matches: any
  list: {
    performance: string,
    home: unknown,
    away: unknown
  }[] = [];

  teams = [
    {
      id: 83,
      name: "FC Barcelona"
    },
    {
      id: 3468,
      name: "Real Madrid"
    }
  ]


  constructor() {
  }

  @Input() allMatches: H2hTeams[] | undefined;
  @Input() firstTeamName!: string;
  @Input() secondTeamName!: string;


  ngOnInit(): void {
  }

  changeMatch(value: string) {
    if (/^\d+$/.test(value)) {
      const stat = this.matchStates?.find(s => s.id === +value)?.stats;
      if (stat) {
        this.teamStat(stat[0], stat[1]);
      }
    } else {
      this.teamStatByHomeTeam(this.matchStates);
    }

  }
  changeMatchByHomeTeam(value: string) {
    const homeTeam = this.allMatches?.filter(s => s.homeTeam.id === +value);
    if(homeTeam && homeTeam.length) {
      this.teamStatByHomeTeam(homeTeam);
    }

  }

  teamStat(home: StateInterface, away: StateInterface) {
    this.list = [{
      performance: 'Shots Total',
      home: home?.shots?.total,
      away: away?.shots.total
    },
      {
        performance: 'Shots Blocked',
        home: home?.shots?.blocked,
        away: away?.shots?.blocked,
      },
      {
        performance: 'Shots Inside Box',
        home: home?.shots.insidebox,
        away: away?.shots.insidebox
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
        home: home?.saves,
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
  teamStatByHomeTeam(matchStates: H2hTeams[] | undefined) {
    let homeTeamShotsTotal: number = 0;
    let awayTeamShotsTotal: number = 0;
    let homeTeamShotsBlock: number = 0;
    let awayTeamShotsBlock: number = 0;
    let homeTeamShotsInsideBox: number = 0;
    let awayTeamShotsInsideBox: number = 0;
    let homeTeamShotsIOutBox: number = 0;
    let awayTeamShotsOutBox: number = 0;
    let homeTeamPassesTotal: number = 0;
    let awayTeamPassesTotal: number = 0;
    let homeTeamPassesAccurate: number = 0;
    let awayTeamPassesAccurate: number = 0;
    let homeTeamPassesPercentage: number = 0;
    let awayTeamPassesPercentage: number = 0;
    let homeTeamAttacks: number = 0;
    let awayTeamAttack: number = 0;
    let homeTeamDangerousAttacks: number = 0;
    let awayTeamDangerousAttacks: number = 0;
    let homeTeamFouls: number = 0;
    let awayTeamFouls: number = 0;
    let homeCorners: number = 0;
    let awayCorners: number = 0;
    let homeOffsides: number = 0;
    let awayOffsides: number = 0;
    let homePossessiontime: number = 0;
    let awayPossessiontime: number = 0;
    let homeYellowcards: number = 0;
    let awayYellowcards: number = 0;
    let homeRedcards: number = 0;
    let awayRedcards: number = 0;
    let homeYellowredcards: number = 0;
    let awayYellowredcards: number = 0;
    let homeSaves: number = 0;
    let awaySaves: number = 0;
    let homeSubstitutions: number = 0;
    let awaySubstitutions: number = 0;
    let homeGoal_kick: number = 0;
    let awayGoal_kick: number = 0;
    let homeGoal_attempts: number = 0;
    let awayGoal_attempts: number = 0;
    let homeFree_kick: number = 0;
    let awayFree_kick: number = 0;
    let homeThrow_in: number = 0;
    let awayThrow_in: number = 0;
    let homeBall_safe: number = 0;
    let awayBall_safe: number = 0;
    let homeGoals: number = 0;
    let awayGoals: number = 0;
    let homePenalties: number = 0;
    let awayPenalties: number = 0;
    let homeInjuries: number = 0;
    let awayInjuries: number = 0;
    if (matchStates && matchStates.length) {
      for (let i = 0; i <= matchStates?.length; i++) {
        if (matchStates && matchStates[i]?.stats[0]?.shots?.total) {
          homeTeamShotsTotal +=((matchStates[i]?.stats[0]?.shots?.total));
        }
        if(matchStates && matchStates[i]?.stats[1]?.shots?.total) {
          awayTeamShotsTotal += (matchStates[i]?.stats[1]?.shots?.total);
        }
        if (matchStates && matchStates[i]?.stats[0]?.shots?.blocked) {
          homeTeamShotsBlock +=((matchStates[i]?.stats[0]?.shots?.blocked));
        }
        if(matchStates && matchStates[i]?.stats[1]?.shots?.blocked) {
          awayTeamShotsBlock += (matchStates[i]?.stats[1]?.shots?.blocked);
        }
        if (matchStates && matchStates[i]?.stats[0]?.shots?.insidebox) {
          homeTeamShotsInsideBox +=((matchStates[i]?.stats[0]?.shots?.insidebox));
        }
        if(matchStates && matchStates[i]?.stats[1]?.shots?.insidebox) {
          awayTeamShotsInsideBox += (matchStates[i]?.stats[1]?.shots?.insidebox);
        }
        if (matchStates && matchStates[i]?.stats[0]?.shots?.outsidebox) {
          homeTeamShotsIOutBox +=((matchStates[i]?.stats[0]?.shots?.outsidebox));
        }
        if(matchStates && matchStates[i]?.stats[1]?.shots?.outsidebox) {
          awayTeamShotsOutBox += (matchStates[i]?.stats[1]?.shots?.outsidebox);
        }
        if (matchStates && matchStates[i]?.stats[0]?.passes?.total) {
          homeTeamPassesTotal +=((matchStates[i]?.stats[0]?.passes?.total));
        }
        if(matchStates && matchStates[i]?.stats[1]?.passes?.total) {
          awayTeamPassesTotal += (matchStates[i]?.stats[1]?.passes?.total);
        }
        if (matchStates && matchStates[i]?.stats[0]?.passes?.accurate) {
          homeTeamPassesAccurate +=(matchStates[i]?.stats[0]?.passes?.accurate);
        }
        if(matchStates && matchStates[i]?.stats[1]?.passes?.accurate) {
          awayTeamPassesAccurate += (matchStates[i]?.stats[1]?.passes?.accurate);
        }
        if (matchStates && matchStates[i]?.stats[0]?.passes?.percentage) {
          homeTeamPassesPercentage +=(matchStates[i]?.stats[0]?.passes?.percentage);
        }
        if(matchStates && matchStates[i]?.stats[1]?.passes?.percentage) {
          awayTeamPassesPercentage += (matchStates[i]?.stats[1]?.passes?.percentage);
        }
        if (matchStates && matchStates[i]?.stats[0]?.attacks?.attacks) {
          homeTeamAttacks +=(matchStates[i]?.stats[0]?.attacks?.attacks);
        }
        if(matchStates && matchStates[i]?.stats[1]?.attacks?.attacks) {
          awayTeamAttack += (matchStates[i]?.stats[1]?.attacks?.attacks);
        }
        if (matchStates && matchStates[i]?.stats[0]?.attacks?.dangerous_attacks) {
          homeTeamDangerousAttacks +=(matchStates[i]?.stats[0]?.attacks?.dangerous_attacks);
        }
        if(matchStates && matchStates[i]?.stats[1]?.attacks?.dangerous_attacks) {
          awayTeamDangerousAttacks += (matchStates[i]?.stats[1]?.attacks?.dangerous_attacks);
        }
        if (matchStates && matchStates[i]?.stats[0]?.fouls) {
          homeTeamFouls +=(matchStates[i]?.stats[0]?.fouls);
        }
        if(matchStates && matchStates[i]?.stats[1]?.fouls) {
          awayTeamFouls += (matchStates[i]?.stats[1]?.fouls);
        }
        if (matchStates && matchStates[i]?.stats[0]?.corners) {
          homeCorners +=(matchStates[i]?.stats[0]?.corners);
        }
        if(matchStates && matchStates[i]?.stats[1]?.corners) {
          awayCorners += (matchStates[i]?.stats[1]?.corners);
        }
        if (matchStates && matchStates[i]?.stats[0]?.offsides) {
          homeOffsides +=(matchStates[i]?.stats[0]?.offsides);
        }
        if(matchStates && matchStates[i]?.stats[1]?.offsides) {
          awayOffsides += (matchStates[i]?.stats[1]?.offsides);
        }
        if (matchStates && matchStates[i]?.stats[0]?.possessiontime) {
          homePossessiontime +=(matchStates[i]?.stats[0]?.possessiontime);
        }
        if(matchStates && matchStates[i]?.stats[1]?.possessiontime) {
          awayPossessiontime += (matchStates[i]?.stats[1]?.possessiontime);
        }
        if (matchStates && matchStates[i]?.stats[0]?.yellowcards) {
          homeYellowcards +=(matchStates[i]?.stats[0]?.yellowcards);
        }
        if(matchStates && matchStates[i]?.stats[1]?.yellowcards) {
          awayYellowcards += (matchStates[i]?.stats[1]?.yellowcards);
        }
        if (matchStates && matchStates[i]?.stats[0]?.redcards) {
          homeYellowcards +=(matchStates[i]?.stats[0]?.redcards);
        }
        if(matchStates && matchStates[i]?.stats[1]?.redcards) {
          awayYellowcards += (matchStates[i]?.stats[1]?.redcards);
        }
        if (matchStates && matchStates[i]?.stats[0]?.yellowredcards) {
          homeYellowredcards +=(matchStates[i]?.stats[0]?.yellowredcards);
        }
        if(matchStates && matchStates[i]?.stats[1]?.yellowredcards) {
          awayYellowredcards += (matchStates[i]?.stats[1]?.yellowredcards);
        }
        if (matchStates && matchStates[i]?.stats[0]?.saves) {
          homeSaves +=(matchStates[i]?.stats[0]?.saves);
        }
        if(matchStates && matchStates[i]?.stats[1]?.saves) {
          awaySaves += (matchStates[i]?.stats[1]?.saves);
        }
        if (matchStates && matchStates[i]?.stats[0]?.substitutions) {
          homeSubstitutions +=(matchStates[i]?.stats[0]?.substitutions);
        }
        if(this.matchStates && this.matchStates[i]?.stats[1]?.substitutions) {
          homeSubstitutions += (this.matchStates[i]?.stats[1]?.substitutions);
        }
        if (this.matchStates && this.matchStates[i]?.stats[0]?.goal_kick) {
          homeGoal_kick +=(this.matchStates[i]?.stats[0]?.goal_kick);
        }
        if(matchStates && matchStates[i]?.stats[1]?.goal_kick) {
          awayGoal_kick += (matchStates[i]?.stats[1]?.goal_kick);
        }
        if (matchStates && matchStates[i]?.stats[0]?.goal_attempts) {
          homeGoal_attempts +=(matchStates[i]?.stats[0]?.goal_attempts);
        }
        if(matchStates && matchStates[i]?.stats[1]?.goal_attempts) {
          awayGoal_attempts += (matchStates[i]?.stats[1]?.goal_attempts);
        }
        if (matchStates && matchStates[i]?.stats[0]?.free_kick) {
          homeFree_kick +=(matchStates[i]?.stats[0]?.free_kick);
        }
        if(matchStates && matchStates[i]?.stats[1]?.free_kick) {
          awayFree_kick += (matchStates[i]?.stats[1]?.free_kick);
        }
        if (matchStates && matchStates[i]?.stats[0]?.throw_in) {
          homeThrow_in +=(matchStates[i]?.stats[0]?.throw_in);
        }
        if(matchStates && matchStates[i]?.stats[1]?.throw_in) {
          awayThrow_in += (matchStates[i]?.stats[1]?.throw_in);
        }
        if (matchStates && matchStates[i]?.stats[0]?.ball_safe) {
          homeBall_safe +=(matchStates[i]?.stats[0]?.ball_safe);
        }
        if(matchStates && matchStates[i]?.stats[1]?.ball_safe) {
          awayBall_safe += (matchStates[i]?.stats[1]?.ball_safe);
        }
        if (matchStates && matchStates[i]?.stats[0]?.goals) {
          homeGoals +=(matchStates[i]?.stats[0]?.goals);
        }
        if(matchStates && matchStates[i]?.stats[1]?.goals) {
          awayGoals += (matchStates[i]?.stats[1]?.goals);
        }
        if (matchStates && matchStates[i]?.stats[0]?.penalties) {
          homePenalties +=(matchStates[i]?.stats[0]?.penalties);
        }
        if(this.matchStates && matchStates[i]?.stats[1]?.penalties) {
          awayPenalties += (matchStates[i]?.stats[1]?.penalties);
        }
        if (matchStates && matchStates[i]?.stats[0]?.injuries) {
          homeInjuries +=(matchStates[i]?.stats[0]?.injuries);
        }
        if(matchStates && matchStates[i]?.stats[1]?.injuries) {
          awayInjuries += (matchStates[i]?.stats[1]?.injuries);
        }

      }
      this.list = [
        {
          performance: 'Shots Total',
          home: (homeTeamShotsTotal/matchStates.length).toFixed(2),
          away: (awayTeamShotsTotal/matchStates.length).toFixed(2),
        },
        {
          performance: 'Shots Blocked',
          home: (homeTeamShotsBlock/matchStates.length).toFixed(2),
          away: (awayTeamShotsBlock/matchStates.length).toFixed(2),
        },
        {
          performance: 'Shots Inside Box',
          home: (homeTeamShotsInsideBox/matchStates.length).toFixed(2),
          away: (awayTeamShotsInsideBox/matchStates.length).toFixed(2)
        },
        {
          performance: 'Shots Outside Box',
          home: (homeTeamShotsIOutBox/matchStates.length).toFixed(2),
          away: (awayTeamShotsOutBox/matchStates.length).toFixed(2)
        },
        {
          performance: 'Passes Total',
          home: (homeTeamPassesTotal/matchStates.length).toFixed(2),
          away: (awayTeamPassesTotal/matchStates.length).toFixed(2),
        },
        {
          performance: 'Accurate Passes',
          home: (homeTeamPassesAccurate/matchStates.length).toFixed(2),
          away: (awayTeamPassesAccurate/matchStates.length).toFixed(2),
        },
        {
          performance: 'Pass Accuracy %',
          home: (homeTeamPassesPercentage/matchStates.length).toFixed(2),
          away: (awayTeamPassesPercentage/matchStates.length).toFixed(2),
        },
        {
          performance: 'Dangerous Attacks',
          home: (homeTeamDangerousAttacks/matchStates.length).toFixed(2),
          away: (awayTeamDangerousAttacks/matchStates.length).toFixed(2)
        },
        {
          performance: 'Fouls',
          home: (homeTeamFouls/matchStates.length).toFixed(2),
          away: (awayTeamFouls/matchStates.length).toFixed(2)
        },
        {
          performance: 'Corners',
          home: (homeCorners/matchStates.length).toFixed(2),
          away: (awayCorners/matchStates.length).toFixed(2),
        },
        {
          performance: 'Offsides',
          home: (homeOffsides/matchStates.length).toFixed(2),
          away: (awayOffsides/matchStates.length).toFixed(2),
        },
        {
          performance: 'Possession Time',
          home: (homePossessiontime/matchStates?.length).toFixed(2),
          away: (awayPossessiontime/matchStates?.length).toFixed(2),
        },
        {
          performance: 'Yellow Cards',
          home: (homeYellowcards/matchStates?.length).toFixed(2),
          away: (awayYellowcards/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Red Cards',
          home: (homeRedcards/matchStates?.length).toFixed(2),
          away: (awayRedcards/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Yellow Red Cards',
          home: (homeYellowredcards/matchStates?.length).toFixed(2),
          away: (awayYellowredcards/matchStates?.length).toFixed(2),
        },
        {
          performance: 'Saves',
          home: (homeSaves/matchStates?.length).toFixed(2),
          away: (awaySaves/matchStates?.length).toFixed(2),
        },
        {
          performance: 'Substitutions',
          home: (homeSubstitutions/matchStates?.length).toFixed(2),
          away: (awaySubstitutions/matchStates?.length).toFixed(2),
        },
        {
          performance: 'Goal Kicks',
          home: (homeGoal_kick/matchStates?.length).toFixed(2),
          away: (awayGoal_kick/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Goal Attampts',
          home: (homeGoal_attempts/matchStates?.length).toFixed(2),
          away: (awayGoal_attempts/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Free Kicks',
          home: (homeFree_kick/matchStates?.length).toFixed(2),
          away: (awayFree_kick/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Throw Ins',
          home: (homeThrow_in/matchStates?.length).toFixed(2),
          away: (awayThrow_in/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Ball Safe',
          home: (homeBall_safe/matchStates?.length).toFixed(2),
          away: (awayBall_safe/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Goals',
          home: (homeGoals/matchStates?.length).toFixed(2),
          away: (awayGoals/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Penalties',
          home: (homePenalties/matchStates?.length).toFixed(2),
          away: (awayPenalties/matchStates?.length).toFixed(2)
        },
        {
          performance: 'Injuries',
          home: (homeInjuries/matchStates?.length).toFixed(2),
          away: (awayInjuries/matchStates?.length).toFixed(2)
        }
      ];
    }
  }

  ngOnChanges(): void {
    this.matchStates = this.allMatches;
    this.matches = this.allMatches?.map(m => {
      return {
        id: m.id
      }
    });
    this.teamStatByHomeTeam(this.matchStates)
  }
}
