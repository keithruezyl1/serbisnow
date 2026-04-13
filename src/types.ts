export interface Card {
  id: string;
  front: string;
  back: string;
  scope?: string;
}

export interface SessionCard extends Card {
  okCount: number;
}
