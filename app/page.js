import Image from 'next/image';
import styles from './page.module.scss';

export default function AddRestaurants() {
  return (
    <div
    // className={styles.globe}
    >
      <Image
        className={styles.img}
        src="/newglobe.tiff"
        alt="globe image"
        width="750"
        height="750"
      />
    </div>
  );
}
