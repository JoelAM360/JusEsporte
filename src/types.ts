export interface User {
  id: string;
  name: string;
  email: string;
  oab: string; // OAB number
  state: string;
}

export interface Game {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  tournament: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  goals: number;
  matches: number;
}