import { StateInterface } from "./match.interface";

export interface H2hInterestingInterface {
  aggregate_id?: null;
  attendance?: null;
  commentaries: boolean;
  details?: null;
  ft_score: string;
  group_id?: null;
  h2h_id: number;
  id: number;
  league_id: number;
  local_team: {
    name: string;
    logo_path: string;
  };
  localteam_id: number;
  localteam_score: number;
  neutral_venue: boolean;
  pitch?: null;
  referee_id?: null;
  round_id: number;
  season_id: number;
  stage_id: number;
  venue_id: number;
  visitor_team: {
    name: string;
    logo_path: string;
  };
  league: {
    logo_path: string;
  }
  visitorteam_id: number;
  visitorteam_score: number;
  weather_report?: null;
  winner_team_id: number;
  winning_odds_calculated: boolean;
}

export interface H2hTeams {
  id: number,
  dateStart: string,
  homeTeam: {
    id: number,
    logo_path?: string,
    name: string,
    score: number,
  },
  awayTeam: {
    id: number,
    logo_path?: string,
    name: string,
    score: number,
  },
  league: {
    id: number,
    logo_path?: string,
  },
  stats: StateInterface[];

}
