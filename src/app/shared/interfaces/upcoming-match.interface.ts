import {Team} from "./team-profile.interface";
import {League} from "./league.interface";

export interface Upcoming {
  id: number;
  firstTeam: Team;
  secondTeam: Team;
  date: string;
  time: string;
  league: League;
  city: string;
  dateTime: Date;
  matchLeft?: {
    day: number;
    hour: number;
    minute: number;
    second: number;
  }
  odds: {
    oddFirstTeam: string,
    oddSecondTeam: string,
  }
}
