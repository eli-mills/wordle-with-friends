/************************************************
 *                                              *
 *                 GAMEPLAY TYPES               *
 *                                              *
 ************************************************/
export type Result = "hit" | "has" | "miss";

export type EvaluationResponseData = {
  resultByPosition?: Result[];
  resultByLetter?: Record<string, Result>;
  accepted: boolean;
  correct: boolean;
};

/************************************************
 *                                              *
 *                    MODELS                    *
 *                                              *
 ************************************************/
export type GameStatus = "lobby" | "choosing" | "playing";

export type Game = {
  roomId: string;
  leader: Player;
  playerList: Player[];
  status: GameStatus;
  chooser: Player | null;
  currentAnswer: string;
  speedBonusWinner: Player | null;
};

export type Player = {
  socketId: string;
  roomId: string;
  name: string;
  isLeader: boolean;
  guessResultHistory: Result[][];
  score: number;
  solved: boolean;
};
