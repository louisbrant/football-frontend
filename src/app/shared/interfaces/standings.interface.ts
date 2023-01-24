export interface CompetitionStanding {
  id: number;
  name: string;
  logo_path: string;
  rank: number;
  gamesPlayed: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsDifference: string;
  goalsTotal: number;
  result: string;
  class?: string;
}

export enum TypeOfLeague {
  LeagueChampions = 'UEFA Champions League',
  LeagueChampionsQualifiers = 'UEFA Champions League Qualifiers',
  LeagueEurope = 'UEFA Europa League',
  LeagueEuropeQualifiers = 'UEFA Europa League Qualifiers',
  LeagueConference = 'UEFA Conference League Qualifiers',
  Relegation = 'Relegation'
}
