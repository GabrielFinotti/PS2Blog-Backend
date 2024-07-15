interface Plataform {
  name: string;
}

interface Downloads {
  url: string;
}

interface Likes {
  totalLikes: number;
  users: {
    userId: string;
  }[];
}

interface Comments {
  userId: string;
  comment: string;
}

export interface Game {
  image: string;
  name: string;
  release: string;
  plataforms: Plataform[];
  category: string;
  rating: number;
  description: string;
  downloads: Downloads[];
  likes: Likes;
  comments: Comments[];
}
