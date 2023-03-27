import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Wanderlust: Discover the world, one attraction at a time.',
  description:
    'The ultimate travel attraction app offers recommendations on popular tourist spots, cultural events and local attractions based on your location. With current phone number, address and website links,this app makes planning and experiencing your next adventure effortless and unforgettable.',
};
export default function AddRestaurants() {
  return (
    <div>
      <Head>
        {' '}
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900"
          rel="stylesheet"
        />
      </Head>
      <div>
        <h1 className={styles.h1}>WANDERLUST</h1>
        <Link href="/login" className={styles.btn}>
          Start my Adventure
        </Link>
      </div>
      <Image
        className={styles.img}
        src="/attractions.jpeg"
        alt="globe image"
        width={1530}
        height={1010}
        quality={100}
      />
    </div>
  );
}
