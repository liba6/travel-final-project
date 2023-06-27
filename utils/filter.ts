import { Favorites, Place } from '../app/types';

export default function Filter(places: Place[], favorites: Favorites): Place[] {
  const attractionsFromFavorites = favorites.map(
    (favorite) => favorite.attraction,
  );
  const matches = places.filter((place) =>
    attractionsFromFavorites.includes(place.name),
  );
  return matches;
}
