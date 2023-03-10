import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByUsername } from '../../../database/users';

type Props = {
    params: {username: string}
};

export default async function UserFavorites({params}:Props) {

    const user = await getUserByUsername(params.username)

     if (!user) {
        redirect(`/login`)
     }

    const sessionTokenCookie = cookies().get('sessionToken')
    
    const session = sessionTokenCookie && (await getValidSessionByToken(sessionTokenCookie.value));

    if (!session){
        redirect(`/login?returnTo=/favorites/${user.username}`)
    }

    console.log(user)
    return <>
    <h1>{user.username}'s Favorites</h1>
    <p>id: {user.id}</p>
    </>
}

