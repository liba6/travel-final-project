import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  attraction: string;
  address: string;
  website: string;
  phone: string;
  userId: number;
};

export const createFavorite = cache(
  async (
    attraction: string,
    address: string,
    website: string,
    phone: string,
    userId: number,
  ) => {
    const [favorite] = await sql<Favorite[]>`
    INSERT INTO favorites
     (attraction,address,website,phone,user_id)
    VALUES
     (${attraction}, ${address}, ${website}, ${phone}, ${userId})
     RETURNING
      id,
      attraction,
      address,
      website,
      phone,
      user_id

  `;
    return favorite;
  },
);

export const getFavoritesByUserId = cache(async (userId: number) => {
  const favorites = await sql<Favorite[]>`
    SELECT * FROM favorites
    WHERE
    user_id = ${userId}
  `;

  return favorites;
});

export const deleteFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
    DELETE FROM
      favorites
    WHERE
      id = ${id}
    RETURNING *
  `;
  return favorite;
});

export const deletePlaceByName = cache(async (name: string) => {
  const [favorite] = await sql<Favorite[]>`
    DELETE FROM
      favorites
    WHERE
      attraction = ${name}
    RETURNING *
  `;
  return favorite;
});
