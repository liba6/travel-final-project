'use client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Favorites, Place, User } from '../../../database/types';
import styles from './page.module.scss';

type Props = {
  places: Place[];
  properties: Properties;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
};

type Properties = {
  user: User;
  favorites: Favorites;
};

export default function AttractionsInfo({
  places,
  properties,
  setPlaces,
}: Props) {
  const [errormsg, setErrormsg] = useState('');
  const myRef = useRef(null);

  return (
    <div ref={myRef} className={styles.cardContainer}>
      {places.map((place: Place) =>
        place.address || place.phone || place.website ? (
          <Grid key={`place-${place.name}`} item xs={12} md={7}>
            <Card elevation={6} className={styles.card}>
              <CardMedia
                className={styles.cardmedia}
                image={
                  place.photo
                    ? place.photo.images.large.url
                    : '/placeholder.jpg'
                }
                title={place.name}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="h5">
                    {place.name}
                  </Typography>
                  {!properties.user ? undefined : (
                    <button
                      className={styles.favorite}
                      // onclick changes the isClicked value for each item on each click
                      onClick={async () => {
                        const newPlaces = places.map((item: Place) => {
                          if (item.name !== place.name) {
                            return item;
                          } else {
                            return {
                              ...item,
                              isClicked: !item.isClicked,
                            };
                          }
                        });

                        setPlaces(newPlaces);

                        // api to send the place to databae

                        if (!place.isClicked) {
                          const response = await fetch('/api/favorites', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              attraction: place.name,
                              address: place.address || null,
                              website: place.website || null,
                              phone: place.phone || null,
                              userId: properties.user.id,
                            }),
                          });

                          const data = await response.json();
                          if (data.error) {
                            setErrormsg(data.error);
                            return errormsg;
                          }
                        } else {
                          const res = await fetch(`/api/delete/${place.name}`, {
                            method: 'DELETE',
                          });
                          const data = await res.json();
                          if (data.error) {
                            setErrormsg(data.error);
                            return errormsg;
                          }
                        }
                      }}
                    >
                      {place.isClicked ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}
                    </button>
                  )}
                </Box>

                {!!place.address && (
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary"
                    className={styles.subtitle}
                  >
                    <LocationOnIcon />
                    {place.address}
                  </Typography>
                )}
                {!!place.phone && (
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary"
                    className={styles.spacing}
                  >
                    <PhoneIcon /> {place.phone}
                  </Typography>
                )}
              </CardContent>
              <CardActions className={styles.cardActions}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(place.web_url, '_blank')}
                >
                  Trip Advisor
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(place.website, '_blank')}
                >
                  {place.name} Website
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : null,
      )}
    </div>
  );
}
