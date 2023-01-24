export interface LiveEventsLeagueInterface {
  events: {
    extra_minute: null;
    fixture_id: number;
    id: number;
    injuried: null;
    minute: number;
    on_pitch: boolean;
    player_id: null;
    player_name: null;
    reason: null;
    related_player_id: null;
    related_player_name: null;
    result: string;
    team_id: string;
    type: string;
    var_result: null;
  }[];
  item: {};
  league: {
    active: boolean;
    country: {};
    country_id: number;
    coverage: {};
    current_round_id: number;
    current_season_id: number;
    current_stage_id: number;
    id: number;
    is_cup: boolean;
    is_friendly: boolean;
    legacy_id: null;
    live_standings: boolean;
    logo_path: string;
    name: string;
    type: string;
  };
  localTeam: {
    country_id: number;
    current_season_id: number;
    id: number;
    is_placeholder: boolean;
    logo_path: string;
    name: string;
    national_team: boolean;
    venue_id: number;
  };
  stats: [{
    fixture_id: number
  }];
  visitorTeam: {
    country_id: number;
    current_season_id: number;
    id: number;
    is_placeholder: boolean;
    logo_path: string;
    name: string;
    national_team: boolean;
    venue_id: number;
  }
}
