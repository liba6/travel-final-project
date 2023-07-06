import { NextRequest, NextResponse } from 'next/server';
import { deletePlaceByName, Favorite } from '../../../../database/favorites';

export type FavoriteResponseBodyDelete =
  | {
      error: string;
    }
  | {
      favorite: Favorite;
    };

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<FavoriteResponseBodyDelete>> {
  const placeName = params.deleteName;
  if (!placeName) {
    return NextResponse.json(
      {
        error: 'place name is not valid',
      },
      { status: 400 },
    );
  }

  const singlePlace = await deletePlaceByName(placeName);

  if (!singlePlace) {
    return NextResponse.json(
      {
        error: 'Place not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ favorite: singlePlace });
}
