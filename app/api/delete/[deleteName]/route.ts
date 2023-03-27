import { NextRequest, NextResponse } from 'next/server';
import { deleteFavoriteByName } from '../../../../database/favorites';

const favoriteName = (params.favoriteName);
  if (!favoriteName) {
    return NextResponse.json(
      {
        error: 'favorite name is not valid',
      },
      { status: 400 },
    );
  }

  const singleFavorite = await deleteFavoriteByName(favoriteName);
  console.log('singleFavorite', singleFavorite);
  if (!singleFavorite) {
    return NextResponse.json(
      {
        error: 'Favorite not found',
      },
      { status: 404 },
    );
  }
  return NextResponse.json({ favorite: singleFavorite });
}
