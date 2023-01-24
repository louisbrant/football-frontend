import { League } from "./league.interface";

export interface TeamGeneralInfo {
  id: number,
  name: string,
  venue: {
    name: string,
    photo: string,
    capacity: number,
    city: string,
    country: string
  },
  coach: {
    id: number,
    lastName: string
  },
  trophies: {
    league_id: number,
    league_name: string,
    count: number
  }[],
  rivals: {
    id: number,
    name: string
  }[];
  homeForm: string;
  awayForm: string;
  latest: InterfaceLatest[];
}
export interface InterfaceLatest {
  localteam_id: number;
  visitorteam_id: number;
  winner_team_id: number;
}

export interface TeamSecondaryInfo {
  name: string;
  // playersNumber: number;
  topScorer: TopScorer;
}

export interface LastFixture {
  homeForm: string;
  awayForm: string;
}
export interface LeagueInterface {
  data: League
}

export interface TopScorer {
  league: LeagueInterface,
  seasonId: number,
  teamId: number,
  name: string,
  "position": number;
  "season_id": number;
  "player_id": number;
  "team_id": number;
  "stage_id": number;
  "goals": number;
  "penalty_goals": number;
  "type": string;
  topScorer: {
    "player": {
      "data": {
        "player_id": number;
        "team_id": number;
        "country_id": number;
        "position_id": number;
        "common_name": string;
        "display_name": string;
        "fullname": string;
        "firstname": string;
        "lastname": string;
        "nationality": string;
        "birthdate": string;
        "birthcountry": string;
        "birthplace": string;
        "height": string;
        "weight": string;
        "image_path": string;
      }
    }
  }
}


export interface Trophy {
  league: string;
  status: string;
  times: number;
}

export interface Rival {
  id: number;
  logo_path: string;
  name: string;
}

export interface Team {
  id: number;
  logo_path: string;
  name: string;
  score?: number;
  odd?: string;
}

export interface SearchTeam {
  id: number;
  leagueId: number;
  seasonId: number;
  name: string;
}

export interface LoaderState {
  val: boolean;
}


export interface LeagueAndSeasons {
  leagueId: number;
  leagueName: string;
  type: string;
  seasons: SeasonsOfLeague[]
}

export interface SeasonsOfLeague {
  seasonId: number;
  seasonName: string;
}
