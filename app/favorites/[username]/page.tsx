import { Box, Card, CardContent, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getFavoritesByUserId } from '../../../database/favorites';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByUsername } from '../../../database/users';

type Props = {
  params: { username: string };
};

export default async function UserFavorites({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    redirect(`/login`);
  }

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    redirect(`/login?returnTo=/favorites/${user.username}`);
  }

  console.log(user);

  const favorites = await getFavoritesByUserId(user.id);
  return (
    <>
      <h1>{user.username}'s Favorites</h1>
      {/* <p>id: {user.id}</p> */}
      {favorites.map((favorite) => (
        <div key={`favorite-${favorite.attraction}`}>
          {favorite.address}
          {favorite.website}
          {/* <Card elevation={6}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography gutterBottom variant="h5">
                  {favorite.attraction}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  color="textSecondary"
                >
                  <PhoneIcon />
                  {favorite.phone}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  color="textSecondary"
                >
                  {favorite.address}
                  {favorite.attraction} Website
                </Typography>
              </Box>
            </CardContent>
          </Card> */}
        </div>
      ))}
      ;
    </>
  );
}
