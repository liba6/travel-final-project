import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createFavorite,
  deleteFavoriteById,
  Favorite,
} from '../../../database/favorites';

const favoritesSchema = z.object({
  attraction: z.string(),
  address: z.string().nullable(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
  userId: z.number(),
});
const deleteSchema = z.object({
  attraction: z.string(),
  address: z.string().nullable(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
  userId: z.number(),
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

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties firstName, type and accessory ',
      },
      { status: 400 },
    );
  }
  console.log('bodyinapiroute', result);

  const newFavorite = await createFavorite(
    result.data.attraction,
    result.data.address,
    result.data.website,
    result.data.phone,
    result.data.userId,
  );

  if (!newFavorite) {
    return NextResponse.json({ error: 'no favorite' });
  }

  return NextResponse.json({ favorites: newFavorite });
}
