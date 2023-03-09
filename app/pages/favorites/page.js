import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getValidSessionByToken } from '../../../database/sessions';

export default async function Favorites() {

    // check if no valid session
    const sessionTokenCookie = cookies().get('sessionToken')
    
    const session = sessionTokenCookie && (await getValidSessionByToken(sessionTokenCookie.value));

    if (!session){
        redirect('/login?returnTo=/pages/favorites')
    }

    // if yes, render favorites


    return (
    <div>
        <h1>Favorites!</h1>
        </div>
    )
}