export interface LineupsInterface {
  bench: {
    additional_position: null;
    captain: null;
    fixture_id: number;
    formation_position: null;
    number: number;
    player_id: number;
    player_name: string;
    position: string;
    posx: null;
    posy: null;
    stats: {
      shots: {
        cards: {
          redcards: number;
          yellowcards: number;
          yellowredcards: number;
        }
      }, goals: {
        scored: number;
        },
    }
    team_id: number;
    type: string
  }[];
  formations: {
    localteam_formation?: string;
    visitorteam_formation?: string;
  };
  lineup: {
    country_id: number;
    current_season_id: number;
    founded: number;
    id: number;
    is_placeholder: boolean;
    legacy_id: null;
    logo_path: string;
    name: string;
    national_team: boolean;
    short_code: null;
    twitter: null;
    venue_id: number;
  }[];
}
