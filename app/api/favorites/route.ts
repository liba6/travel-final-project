import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createFavorite, Favorite } from '../../../database/favorites';

const favoritesSchema = z.object({
  id: z.string(),
  attraction: z.string(),
  address: z.string(),
  website: z.string(),
  phone: z.string(),
  user_id: z.number(),
});
export type FavoriteResponseBodyPost =
  | { error: string }
  | {
      favorites: Favorite;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FavoriteResponseBodyPost>> {
  const body = await request.json();
  const result = favoritesSchema.safeParse(body);
  console.log('bodyinapiroute', result);

  const newFavorite = await createFavorite(
    result.data.id,
    result.data.attraction,
    result.data.address,
    result.data.website,
    result.data.phone,
    result.data.user_id,
  );
}
