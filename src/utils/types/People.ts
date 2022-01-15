export interface IPerson {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: IVotes;
}

export interface IVotes {
  positive: number;
  negative: number;
}

export interface IPeopleState {
  people: IPerson[];
}

export enum THUMBS {
  UP = "UP",
  DOWN = "DOWN",
}
