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

  // const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if there is no user

  if (user === undefined) {
    redirect('/login');
  }
  const favorites = await getFavoritesByUserId(user.id);

  return (
    <div>
      {/* <script
        src={`https://maps.googleapis.com/maps/api/js?key=${myKey}&libraries=places`}
      /> */}
      <ListingAttractionsApp user={user} favorites={favorites} />
    </div>
  );
}
