import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Wanderlust: Discover the world, one attraction at a time.',
  description:
    'The ultimate travel attraction app offers recommendations on popular tourist spots, cultural events and local attractions based on your location. With current phone number, address and website links,this app makes planning and experiencing your next adventure effortless and unforgettable.',
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

  const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html lang="en">
      <head>
        {' '}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={styles.body}>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${myKey}&libraries=places`}
        />
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
                <span className={styles.favorites}>
                  {user.username + ' '}Favorites
                </span>
              </a>
            )}
            {user && (
              <Link href="/logout" prefetch={false}>
                <span className={styles.li}>Logout</span>
              </Link>
            )}
          </div>
        </nav>

        {props.children}
        <footer className={styles.footer}>
          Designed by Liba Shapiro MSc 2023
        </footer>
      </body>
    </html>
  );
}
