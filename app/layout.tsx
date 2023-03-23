import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
// import './globals.css';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Travel the World',
  description: 'An app that makes choosing attractions when touring easy.',
  icons: {
    shortcut: '/favicon.ico',
  },
};
type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // if (!user) {
  //   redirect('/login');
  // }
  // if (!user) {
  //   redirect(`/login?returnTo=/favorites/${user.username}`);
  // }
  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out
  console.log(user);
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <nav>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="globe with logo"
              width="190"
              height="190"
              className={styles.logo}
            />
          </Link>
          <ul className={styles.nav}>
            <Link href="/attractions">
              <li className={styles.li}>Find an Attraction</li>
            </Link>
            {/* <Link href="/register">
      <li className={styles.li}>Register</li>
      </Link> */}
            <Link href="/login">
              <li className={styles.li}>Login</li>
            </Link>
            {user && (
              <Link href={`/favorites/${user.username}`}>
                <li className={styles.li}>
                  {user.username + ' '}Favorites
                  {/* <FavoriteIcon color="error" /> */}
                </li>
              </Link>
            )}
            <Link href="/logout" prefetch={false}>
              <li className={styles.li}>Logout</li>
            </Link>
          </ul>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
