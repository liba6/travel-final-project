import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFavoritesByUserId } from '../../database/favorites';
import { getUserBySessionToken } from '../../database/users';
import ListingAttractionsApp from '../components /listingattractions/ListingAttractionsApp';

export default async function Attractions() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const favorites = await getFavoritesByUserId(user.id);

  // if there is no user
  if (user === undefined) {
    alert('Please login first.');
    redirect('/login');
  }
  return (
    <div>
      {/* <Header /> */}
      {/* <TravelMap/> */}
      <ListingAttractionsApp user={user} favorites={favorites} />
    </div>
  );
}
