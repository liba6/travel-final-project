// import { NextRequest, NextResponse } from 'next/server';
// import { deleteFavoriteById, Favorite } from '../../../../database/favorites';

// // send a delete request to delete a favorite from the database

// export type FavoriteResponseBodyDelete =
//   | {
//       error: string;
//     }
//   | {
//       favorite: Favorite;
//     };

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Record<string, string | string[]> },
// ): Promise<NextResponse<FavoriteResponseBodyDelete>> {
//   const favoriteId = Number(params.favoriteId);
//   if (!favoriteId) {
//     return NextResponse.json(
//       {
//         error: 'Animal id is not valid',
//       },
//       { status: 400 },
//     );
//   }

//   const singleFavorite = await deleteFavoriteById(favoriteId);
//   console.log('singleFavorite', singleFavorite);
//   if (!favoriteId) {
//     return NextResponse.json(
//       {
//         error: 'Favorite not found',
//       },
//       { status: 404 },
//     );
//   }
//   if (singleFavorite) {
//     return NextResponse.json({ favorite: singleFavorite });
//   }
// }
