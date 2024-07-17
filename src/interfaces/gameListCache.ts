import { Game } from "./game";

export interface GameListCache {
  gameList: Game[];
  ratingGames: Game[];
  likesGames: Game[];
  categoriesAndYears: {
    categories: string[];
    releases: string[];
  };
}
