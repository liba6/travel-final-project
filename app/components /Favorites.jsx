'use client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CssBaseline,
  Grid,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useRouter } from 'next/navigation';
import styles from '../favorites/page.module.scss';

export default function Favorites(props) {
  const router = useRouter();
  return (
    <div className={styles.favorites}>
      <Grid container spacing={3} className={styles.cardGridContainer}>
        <div>
          {props.favorites.map((favorite) => (
            <Grid key={`favorite-${favorite.attraction}`} item xs={12} md={6}>
              <Card elevation={6} className={styles.card}>
                <div className={styles.cardContent}>
                  <h2 className={styles.attraction}>
                    {' '}
                    {/* <AttractionsOutlinedIcon /> */}
                    {favorite.attraction}
                  </h2>

                  <p className={styles.address}>
                    <LocationOnIcon />
                    {favorite.address}
                  </p>
                  <p className={styles.phone}>
                    {' '}
                    <PhoneIcon />
                    {favorite.phone}
                  </p>

                  <p className={styles.website}>
                    {' '}
                    <LanguageOutlinedIcon />
                    {favorite.website}
                  </p>
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
                      // console.log('data', data);
                      router.refresh();
                    }}
                  >
                    <DeleteForeverRoundedIcon size="large" />
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
