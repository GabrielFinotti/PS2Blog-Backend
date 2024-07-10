export interface User {
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  likedGames: {
    totalLikes: number;
    games: string[];
  };
}
