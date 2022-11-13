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

export interface Bet {
  gameId: number;
  gameUrl: string;
  teamName: string;
  beginsInTime: string;
  moneyBetAmount?: number;
}

export interface MatchEnd {
  gameId: number;
  teamName: string;
  gameUrl: string;
  winner: string;
  isMatchEnd: boolean;
  beginsInTime: string;
  moneyBetAmount: number;
}

export interface Stats {
  won: number;
  lost: number;
}
