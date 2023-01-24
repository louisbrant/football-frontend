import { Team } from './team-profile.interface';

export interface Player {
  id: number;
  number: number;
  fullName: string;
  image_path: string;
  position: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  cards: number;
  timePlayed: number;
  rating: string;
  team_logo?: string;
}

export interface PlayerSearch {
  id: number;
  name: string;
  teamId: number;
  teamName: string;
  leagueId: number;
  seasonId: number;
}

export interface PlayerStats {
  id: number;
  position: number;
  shirtNumber: number;
  statistics: {
    captain: boolean;
    injured: boolean;
    minutesPlayed: number;
    appearences: number;
    lineups: number;
    subbedIn: number;
    subbedOut: number;
    goals: number;
    ownGoals: number;
    assists: number;
    saves: number;
    insideBoxSaves: number;
    dispossessed: number;
    interceptions: number;
    yellowCards: number;
    yellowRed: number;
    directRedCards: number;
    tackles: number | null;
    blocks: number | null;
    hitPost: number | null;
    cleanSheets: number;
    rating: string;
    fouls: {
      committed: number | null;
      drawn: number | null;
    };
    crosses: {
      total: number | null;
      accurate: number | null;
    };
    dribble: {
      attempts: number | null;
      success: number | null;
      past: number | null;
    };
    duels: {
      total: number | null;
      won: number | null;
    };
    passes: {
      total: number | null;
      accuracy: number | null;
      key: number | null;
    };
    penalties: {
      won: number | null;
      scored: number | null;
      missed: number | null;
      committed: number | null;
      saves: number | null;
    };
    shots: {
      total: number | null;
      onTarget: number | null;
      offTarget: number | null;
    };
  };
}

export interface GeneralInfo {
  id: number;
  fullName: string;
  image_path: string;
  birthdate: string;
  age: number;
  birthplace: {
    country: string;
    flag_image_path: string;
    city: string;
  };
  position: string;
  team: Team;
  leagueName: string;
  rating: string;
  weight: string;
  height: string;
  number: number;
  leagueId: number;
  seasonId: number;
}
