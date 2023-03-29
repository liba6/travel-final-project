import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
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
          <div className={styles.nav}>
            <a className={styles.li} href="/attractions">
              <span>Attractions</span>
            </a>
            {!user && (
              <Link href="/login">
                <span className={styles.li}>Login</span>
              </Link>
            )}
            {user && (
              <a href={`/favorites/${user.username}`}>
                <span className={styles.li}>
                  {user.username + ' '}Favorites
                </span>
              </a>
            )}
            <Link href="/logout" prefetch={false}>
              <span className={styles.li}>Logout</span>
            </Link>
          </div>
        </nav>

        {props.children}
        <footer className={styles.footer}>Liba Shapiro MSc 2023</footer>
      </body>
    </html>
  );
}
