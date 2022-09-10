export interface Response<T> {
  data: T,
  status: number
}

export interface Team {
  name: string;
  logo: string;
}

export interface Match {
  id: number;
  HLTVLink: string;
  matchRating: number;
  beginsInTime: string;
  team_1: Team;
  team_2: Team;
}

export interface AllMatchesResponse {
  matches: Match[]
}


export interface Bet {
  gameUrl: string;
  gameId: number;
  teamName: string;
}
