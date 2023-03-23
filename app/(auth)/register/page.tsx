import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
  // check if I have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (session) {
    redirect('/');
  }

  return (
    <div>
      <RegisterForm returnTo={props.searchParams.returnTo} />
    </div>
  );
}
