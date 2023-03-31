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
      <div className={styles.pagediv}>
        <h1 className={styles.h1}>WANDERLUST</h1>
      </div>
      <div>
        <Link href="/attractions" className={styles.btn}>
          <span>Start my Adventure</span>
          <span>
            {' '}
            {/* <img src="/hand.png" alt="hand icon" className={styles.icon} /> */}
          </span>
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
