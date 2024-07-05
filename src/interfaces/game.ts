export interface Game {
  image: string;
  name: string;
  release: string;
  category: string;
  rating: number;
  description: string;
  downloads: {
    url: string;
  }[];
  likes: {
    totalLikes: number;
    user: {
      userID: string;
    }[];
  };
  comments: {
    userID: string;
    comment: string;
  }[];
}
