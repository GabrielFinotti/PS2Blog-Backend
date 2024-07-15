interface AlternateTitle {
  description: string;
  title: string;
}

interface Genre {
  genre_category: string;
  genre_category_id: number;
  genre_id: number;
  genre_name: string;
}

interface Platform {
  first_release_date: string;
  platform_id: number;
  platform_name: string;
}

interface SampleScreenshot {
  caption: string;
  height: number;
  image: string;
  thumbnail_image: string;
  width: number;
}

interface SampleCover {
  height: number;
  image: string;
  platforms: string[];
  thumbnail_image: string;
  width: number;
}

export interface GameByMobygames {
  alternate_titles: AlternateTitle[];
  description: string;
  game_id: number;
  genres: Genre[];
  moby_score: number;
  moby_url: string;
  num_votes: number;
  official_url: string;
  platforms: Platform[];
  sample_cover: SampleCover;
  sample_screenshots: SampleScreenshot[];
  title: string;
}
