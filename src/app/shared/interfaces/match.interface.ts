export interface MatchInterface {
  stats: StateInterface[];
  events: any[];
  lineup: LineupInterFace[];
  bench: LineupInterFace[];
  localTeam: LocalTeamInterface;
  visitorTeam: LocalTeamInterface;
  formations: {
    localteam_formation?: string;
    visitorteam_formation?: string;
  }
  matchEnd: string;

  referee: RefereeInterface,
  league: LeagueInterface,
  venue: VenueInterface,
  time: {
    status: string,
    starting_at: {
      date_time: string,
      date: string,
      time: string,
      timestamp: number,
      timezone: string,
    },
    minute: number,
    second: null,
    added_time: null,
    extra_minute: null,
    injury_time: null
  },
  weather: {
    code: string,
    type: string,
    icon: string,
    temperature: { temp: number, unit: string },
    temperature_celcius: { temp: number, unit: string },
    clouds: string,
    humidity: string,
    pressure: number,
    wind: { speed: string, degree: number },
    coordinates: { lat: number, lon: number },
  }
  item?: {
    time: {
      status: string,
      minute: number
    }
  };

}

export interface VenueInterface {
  address: string,
  capacity: number,
  city: string,
  coordinates: string,
  id: number,
  image_path: string,
  name: string,
  surface: string,
}

export interface LeagueInterface {
  active: boolean,
  country_id: number,
  coverage: { predictions: boolean, topscorer_goals: boolean, topscorer_assists: boolean, topscorer_cards: boolean }
  current_round_id: number,
  current_season_id: number,
  current_stage_id: number,
  id: number,
  is_cup: boolean,
  is_friendly: boolean,
  legacy_id: number,
  live_standings: boolean,
  logo_path: string,
  name: string,
  type: string,
}

export interface RefereeInterface {
  common_name: string,
  firstname: string,
  fullname: string,
  id: number,
  lastname: string
}

export interface LocalTeamInterface {
  country: {
    data: {
      id: number,
      image_path: string,
      name: string
    }
  },
  country_id: number;
  current_season_id: number;
  founded: number;
  id: number;
  is_placeholder: boolean;
  legacy_id: number;
  logo_path?: string;
  name: string;
  national_team: boolean;
  short_code: string;
  twitter: null;
  venue_id: number;
}

export interface StateInterface {
  attacks: { attacks: number, dangerous_attacks: number };
  ball_safe: number;
  corners: number;
  fixture_id: number;
  fouls: number;
  free_kick: number;
  goal_attempts: number;
  goal_kick: number;
  goals: number;
  injuries: number;
  offsides: number;
  passes: { total: number, accurate: number, percentage: number }
  penalties: number;
  possessiontime: number;
  redcards: number;
  saves: number;
  shots: { total: number, ongoal: number, blocked: number, offgoal: number, insidebox: number, outsidebox: number }
  substitutions: number;
  tackles: number;
  team_id: number;
  throw_in: number;
  yellowcards: number;
  yellowredcards: number;
  fixture: {
    data: FixtureInterface
}
}
export interface FixtureInterface {
    aggregate_id: number;
    assistants: { first_assistant_id: number, second_assistant_id: number, fourth_official_id: number };
    attendance: 98485;
    coaches: { localteam_coach_id: number, visitorteam_coach_id: number };
    colors: null;
    commentaries: boolean;
    deleted: false;
    details: boolean;
    formations: { localteam_formation: string, visitorteam_formation: string }
    group_id: null;
    id: number;
    is_placeholder: boolean;
    league_id: number
    leg: string;
    localteam_id: number
    neutral_venue: boolean;
    pitch: null;
    referee_id: number
    round_id: null
    scores: { localteam_score: number, visitorteam_score: number, localteam_pen_score: number, visitorteam_pen_score: number, ht_score: string };
    season_id: number;
    stage_id: number;
    standings: { localteam_position: null, visitorteam_position: null };
    time: { status: string, starting_at: {}, minute: number, second: null, added_time: null };
    venue_id: number;
    visitorteam_id: number;
    weather_report: null;
    winner_team_id: null;
    winning_odds_calculated: boolean;
}

export interface EventInterface {
  extra_minute: null;
  fixture_id: number;
  id: number;
  injuried: null,
  minute: number;
  on_pitch: boolean;
  player_id: number;
  player_name: string;
  reason: null;
  related_player_id: null;
  related_player_name: null;
  result: null;
  team_id: string;
  type: string;
  var_result: null;
}

export interface LineupInterFace {
  additional_position: null
  captain: false
  fixture_id: number;
  formation_position: 1
  number: number;
  player_id: number;
  player_name: string;
  position: string;
  stats: {
    shots: {},
    goals: {
      assists: number;
      conceded: number;
      owngoals: number;
      scored: number;
      team_conceded: number;
    },
    fouls: {},
    cards: {
      redcards: number;
      yellowcards: number;
      yellowredcards: number;
    },
    passing: {},
  }
  team_id: number;
  type: string;
}
