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
    <div>
      <Card elevation={6}>
        <Grid item xs={12} md={4}>
          {props.favorites.map((favorite) => (
            <div key={`favorite-${favorite.attraction}`}>
              <h2 className={styles.attraction}>
                {' '}
                {/* <AttractionsOutlinedIcon /> */}
                {favorite.attraction}
              </h2>

              <h2 className={styles.website}>
                {' '}
                <LanguageOutlinedIcon />
                {favorite.website}
              </h2>
              <h2>
                <LocationOnIcon />
                {favorite.address}
              </h2>
              <h2>
                {' '}
                <PhoneIcon />
                {favorite.phone}
              </h2>
              <button
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
                <DeleteForeverRoundedIcon />
              </button>
            </div>
          ))}
        </Grid>
      </Card>
    </div>
  );
}
