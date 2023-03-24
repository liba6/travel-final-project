import Image from 'next/image';
import styles from './page.module.scss';

export const metadata = {
  title: 'Wanderlust: Discover the world, one attraction at a time.',
  description:
    'The ultimate travel attraction app offers recommendations on popular tourist spots, cultural events and local attractions based on your location. With current phone number, address and website links,this app makes planning and experiencing your next adventure effortless and unforgettable.',
};
export default function AddRestaurants() {
  return (
    <div>
      <div>
        <h1 className={styles.h1}>WANDERLUST</h1>
        <p className={styles.p}>Discover the World's Attractions </p>
        <button>Start my Adventure</button>
      </div>
      <Image
        className={styles.img}
        src="/attractions.jpeg"
        alt="globe image"
        width={1500}
        height={800}
        quality={100}
      />
    </div>
  );
}
