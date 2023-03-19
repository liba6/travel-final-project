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
    const [favorite] = await sql<
      {
        id: number;
        attraction: string;
        address: string;
        website: string;
        phone: string;
        // user_id: number;
      }[]
    >`
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
