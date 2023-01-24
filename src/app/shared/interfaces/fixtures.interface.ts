import {Team} from "./team-profile.interface";
import {League} from "./league.interface";

export interface Fixture {
  id: number;
  dateStart: string;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  class?: string;
  leagueResult: string
}

export interface FixtureData {
  data: Fixture[],
  page: number
}

export enum ResultEnum {
  RESULT = 'RESULT',
  FIXTURE = 'FIXTURE',
}