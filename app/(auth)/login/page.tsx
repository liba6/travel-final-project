import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';
import styles from './page.module.scss';

type Props = {searchParams: {returnTo?: string | string[]}};

export default async function LoginPage (props:Props) {

    // check if I have a valid session
    const sessionTokenCookie = cookies().get('sessionToken')
    
    const session = sessionTokenCookie && (await getValidSessionByToken(sessionTokenCookie.value));

    if (session){
        redirect('/')
    }

    // if not, render login component


    return (
    <div>
        <h1 className={styles.h1}>Login</h1>
            <LoginForm returnTo={props.searchParams.returnTo}/>
    
    </div>
    )
}