'use client';
import { Card, Grid } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useRouter } from 'next/navigation';
import styles from '../favorites/page.module.scss';

type Favorite = {
  attraction: string;
  address?: string;
  phone?: string;
  website?: string;
  id: number;
};

type Props = {
  user: {
    username: string;
  };
  favoritesinfo: Favorite[];
};

export default function Favorites(props: Props) {
  const router = useRouter();
  return (
    <div className={styles.favorites}>
      <Grid container spacing={3} className={styles.cardGridContainer}>
        <h1 className={styles.h1}>{props.user.username}'s Favorites</h1>

        <div className={styles.divFlex}>
          {props.favoritesinfo.map((favorite) => (
            <Grid key={`favorite-${favorite.attraction}`} item xs={12} md={6}>
              <Card elevation={6} className={styles.card}>
                <div className={styles.cardContent}>
                  <h2 className={styles.attraction}> {favorite.attraction}</h2>

                  {favorite.address !== undefined &&
                    favorite.address !== '' && (
                      <p className={styles.address}>
                        <LocationOnIcon />
                        {favorite.address}
                      </p>
                    )}

                  {favorite.phone !== undefined && favorite.phone !== '' && (
                    <p className={styles.phone}>
                      {' '}
                      <PhoneIcon />
                      {favorite.phone}
                    </p>
                  )}

                  {favorite.website !== undefined &&
                    favorite.website !== '' && (
                      <a className={styles.website} href={favorite.website}>
                        <LanguageOutlinedIcon />

                        {favorite.website}
                      </a>
                    )}
                  <button
                    className={styles.delete}
                    onClick={async () => {
                      // send api request to delete favorite from database
                      const response = await fetch(
                        `/api/favorites/${favorite.id}`,
                        {
                          method: 'DELETE',
                        },
                      );

                      const data = await response.json();

                      if (data.error) {
                        console.error(data.error);
                        // return error;
                      }
                      router.refresh();
                    }}
                  >
                    <DeleteForeverRoundedIcon fontSize="large" />
                  </button>
                </div>
              </Card>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
}
