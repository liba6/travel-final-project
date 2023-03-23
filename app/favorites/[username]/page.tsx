import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFavoritesByUserId } from '../../../database/favorites';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByUsername } from '../../../database/users';
import Favorites from '../../components /Favorites';
import styles from '../page.module.scss';

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
    <div className={styles.favorites}>
      <Favorites favorites={favorites} user={user} />
    </div>
  );
}
