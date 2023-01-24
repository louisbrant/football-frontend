import { TypeOfLeague } from "../interfaces/standings.interface";
import { CompetitionStanding } from '../interfaces/standings.interface';

export function setPositionColor(result: string): string {
  let className = '';
  // console.log(result);
  switch (result) {
    case TypeOfLeague.LeagueChampions:
    case TypeOfLeague.LeagueChampionsQualifiers:
      className = 'position-league-champions';
      break;
    case TypeOfLeague.LeagueEurope:
    case TypeOfLeague.LeagueEuropeQualifiers:
      className = 'position-league-europe';
      break;
    case TypeOfLeague.LeagueConference:
      className = 'position-league-conference';
      break;
    case TypeOfLeague.Relegation:
      className = 'position-relegation';
      break;
  }
  // console.log("className=>", className);
  return className
}
