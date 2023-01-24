import {Team} from "./team-profile.interface";
import {Coach} from "./coach.interface";
import {Player} from "./player.interface";

export interface MatchStatistics {
  teamId: number;
  leagueId: number;
  seasonId: number;
  stats: {
    attacks: number;
    dangerousAttacks: number;
    avPossessionPercent: string;
    fouls: number;
    avFoulsPerGame: string;
    offside: number;
    redCards: number;
    yellowCards: number;
    shotsBlocked: number;
    shotsOffTarget: number;
    avShotsOffTarget: string;
    shotsOnTarget: number;
    avShotsOnTarget: string;
    totalCorners: number;
    avCorners: string;
    btts: number;
    avPlayerRatingPerMatch: number;
    tackles: number;
    goal_line: {
    over: GoalLine,
    under: GoalLine
  };
    win: Win;
    draw: Win;
    lost: Win,
    avg_goals_per_game_scored: Win
  }
}
interface GoalLine {
  "0_5": OverTeams;
  1_5: OverTeams;
  2_5: OverTeams;
  3_5: OverTeams;
  4_5: OverTeams;
  5_5: OverTeams;
}
interface Win {
 total: number,
  home: number,
  away: number

}
interface OverTeams {
  home: number;
  away: number;

}

export interface Performance {
  teamId: number;
  leagueId: number;
  wins: OverallTeam;
  draw: OverallTeam;
  lost: OverallTeam;
  goalsFor: OverallTeam;
  goalsAgainst: OverallTeam;
  cleanSheet: OverallTeam;
  failedToScore: OverallTeam;
  avGoalsScored: OverallTeam;
  avGoalsConceded: OverallTeam;
  avFirstGoalsScored: OverallTeam;
  avFirstGoalsConceded: OverallTeam;
}


export interface GoalByMinutes {
  teamId: number;
  name: string;
  leagueId: number;
  seasonId: number;
  period: GoalByMinutesPeriod[];
}

export interface GoalProbabilities {
  teamId: number;
  leagueId: number;
  seasonId: number;
  stats: {
    home: Overs;
    away: Overs;
  }
}

export interface PlayerStats {
  team: Team;
  coach?: Coach;
  players: Player[];
}

interface Overs {
  over_0_5: string;
  over_1_5: string;
  over_2_5: string;
  over_3_5: string;
  over_4_5: string;
  over_5_5: string;
  under_0_5: string;
  under_1_5: string;
  under_2_5: string;
  under_3_5: string;
  under_4_5: string;
  under_5_5: string;
}

interface GoalByMinutesPeriod {
  minute: string;
  scoringCount: number;
  scoringPercent: number;
  concededCount: number;
  concededPercent: number;
}

interface OverallTeam {
  overall: number | string;
  home: number | string;
  away: number | string;
}

export interface DetailStats {
  id: number;
  name: string;
  logo_path: string;
  position: number;
  result: string;
  stats: {
    btts: number;
    over_2_5: PropsDetailStats;
    under_2_5: PropsDetailStats;
    failedToScore: PropsDetailStats;
    cleanSheet: PropsDetailStats;
    corners: {
      total: number;
      avPerGame: string;
    };
    cards: {
      red: number;
      yellow: number;
    }
  }
}

interface PropsDetailStats {
  home: number | string;
  away: number | string;
  total?: number | string;
}


export interface GeneralStats {
  id: number;
  name: string;
  logo_path: string;
  position: number;
  result: string;
  recent_form: string;
  stats: {
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsAgainst: number;
    points: number;
  };
  class?: string;
}
