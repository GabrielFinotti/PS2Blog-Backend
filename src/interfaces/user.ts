interface LikedGames {
  totalLikes: number;
  games: {
    gameId: string;
  }[];
}

export interface User {
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  likedGames: LikedGames;
}
