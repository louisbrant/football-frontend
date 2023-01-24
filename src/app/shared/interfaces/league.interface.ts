export interface League {
  id: number;
  logo_path: string;
  name: string;
}

export interface SeachLeague {
  id: number;
  name: string;
  currentSeasonId: number;
}

export interface GeneralInfoLeague extends League {
  country: string;
  country_flag: string;
  numberOfMatchesPlayed: number;
  numberOfMatches: number;
  progress: string;
  type: string;
  predictability: boolean;
  seasonsDates?: {
    startDate: string;
    endDate: string;
    numberOfMatches?: number;
    numberOfMatchesPlayed?: number;
    progress?: string;
  };
}

export interface PastChampions {
  away: {};
  group_id: null;
  group_name: null;
  home: {};
  overall: {};
  points: number;
  position: number;
  recent_form: string;
  result: null;
  round_id: number;
  round_name: number;
  season: {
    data: {
      name: string;
    };
  };
  status: string;
  team_id: number;
  team_name?: string;
  total: {};
}

export interface RecentlyPlayedInterface {
  id: number;
  latest: RecentlyPlayedLatestInterface[];
  logo_path: string;
  name: string;
  short_code: string;
}
export interface RecentlyPlayedLatestInterface {
  id: number;
  league: {
    data: {
      id: number;
      logo_path: string;
      name: string;
      type: string;
    };
  };
  league_id: number;
  localteam_id: number;
  visitorteam_id: number;
  opponent_name?: any;
  opponent_id: any;
  scores: {
    localteam_score: number;
    visitorteam_score: number;
    localteam_pen_score: number;
    visitorteam_pen_score: number;
    ft_score?: string;
    ht_score: string;
  };
}
export interface TeamComparisionInterface {
  appearences: number;
  assists: number;
  blocks: number;
  captain: number;
  cleansheets: number;
  crosses: { total: number; accurate: number };
  dispossesed: number;
  dribbles: { attempts: number; success: number; dribbled_past: number };
  duels: { total: number; won: number };
  fouls: { committed: number; drawn: number };
  goals: number;
  hit_post: number;
  injured: boolean;
  inside_box_saves: number;
  interceptions: null;
  lineups: number;
  minutes: number;
  number: number;
  owngoals: null;
  passes: { total: number; accuracy: number; key_passes: null };
  penalties: {
    won: null;
    scores: null;
    missed: null;
    committed: null;
    saves: number;
  };
  player: { data: { firstname: string; display_name: string } };
  player_id: number;
  position_id: number;
  rating: string;
  redcards: number;
  saves: number;
  shots: { shots_total: null; shots_on_target: null; shots_off_target: null };
  substitute_in: null;
  substitute_out: null;
  substitutes_on_bench: null;
  tackles: null;
  yellowcards: number;
  yellowred: number;
}
