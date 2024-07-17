import { Game } from "../../../interfaces/game";
import { GameByMobygames } from "../../../interfaces/gameByMobygames";

export const filterGames = (games: GameByMobygames[]) => {
  const filteredGames = games.filter((game) =>
    game.platforms.some((plataform) => plataform.platform_id === 7)
  );

  const formatedGames = filteredGames.map((game) => {
    const plataformPs2 = game.platforms.find(
      (plataform) => plataform.platform_id === 7
    );
    const genre = game.genres.find(
      (genre) => genre.genre_category === "Basic Genres"
    );

    const gameModel: Partial<Game> = {
      image: game.sample_cover.image,
      name: game.title,
      release: plataformPs2?.first_release_date,
      plataforms: [
        {
          name: plataformPs2?.platform_name ?? "",
        },
      ],
      category: genre?.genre_name,
      description: game.description,
      rating: game.moby_score,
    };

    return gameModel;
  });

  return formatedGames;
};
