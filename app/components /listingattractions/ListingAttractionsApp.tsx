'use client';

import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useEffect, useRef, useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import getPlacesData from '../../../utils/places';
import TravelMap from '../map/TravelMap';
import styles from './page.module.scss';

type Props = {
  user: User;
  favorites: Favorites;
};

type Favorites = {
  id: number;
  attraction: string;
  address: string;
  website: string;
  phone: string;
  userId: number;
}[];

type User = {
  id: number;
  username: string;
};

type Place = {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  website: string;
  web_url: string;
  phone: string;
  isClicked: boolean;
  photo: {
    images: {
      large: {
        url: string;
      };
    };
  };
};

export type WeatherIcon = {
  current: {
    temp: number;
    weather: {
      icon: string;
    }[];
  };
};

// type Suggestion = {
//   description: string;
//   active: boolean;
// };

// type RenderFunctionProps = {
//   getInputProps: (params?: object) => object;
//   suggestions: Suggestion[];
//   getSuggestionItemProps: (suggestion: Suggestion, params?: object) => object;
//   loading: boolean;
// };

export default function ListingAttractions(props: Props) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [coords, setCoords] = useState<number[]>([]);
  const [address, setAddress] = useState('');
  const [selection, setSelection] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [favorites, setFavorites] = useState(props.favorites);
  const [weatherIcon, setWeatherIcon] = useState<WeatherIcon>({
    current: { temp: 0, weather: [{ icon: '' }] },
  });

  console.log('avoidprob', setFavorites);

  // const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const myToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const myWeatherKey = process.env.NEXT_PUBLIC_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&exclude=hourly,daily&appid=${myWeatherKey}`;

  const myRef = useRef(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // add a check to make sure data is not undefined before accessing its properties
          setWeatherIcon(data);
        }
      })
      .catch(() => alert('error'));
  }, [url]);

  const handleSelect = (value: string) => {
    setSelection(value);
    setAddress(value);
  };

  // api call to get current user location as starting point
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords([longitude, latitude]);
      },
    );
  }, []);

  // api call to convert given city to its coordinates
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${selection}.json?access_token=${myToken}`,
    )
      .then((res) => res.json())
      .then((res) => res.features[1].geometry.coordinates)
      .then((res) => {
        setCoords(res);
      })
      .catch(() => console.log('Error'));
  }, [selection, myToken]);

  // get database favorites
  useEffect(() => {
    async function a() {
      const placesData = await getPlacesData(coords);

      const attractionsFromDatabaseArray = favorites.map(
        (place) => place.attraction,
      );

      // map over data, to add clicked value true to favorites, false to others
      const placesWithClicks = placesData.map((place: Place) => {
        if (attractionsFromDatabaseArray.includes(place.name)) {
          return { ...place, isClicked: true };
        }
        return { ...place, isClicked: false };
      });

      setPlaces(placesWithClicks);
    }

    a().catch((error) => {
      console.log(error);
    });
  }, [coords, favorites]);
  console.log('coords', coords);
  console.log('places', places);
  console.log('icon', weatherIcon);

  return (
    <div>
      <CssBaseline />
      {/* <script
        src={`https://maps.googleapis.com/maps/api/js?key=${myKey}&libraries=places`}
      /> */}

      <AppBar position="static" className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h5" className={styles.title}>
            Attractions in {`${address} `}
          </Typography>
          <Box display="flex">
            <Typography variant="h6" className={styles.title} />

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className={styles.searchArea}>
                  <div className={styles.searchIcon}>
                    <SearchIcon />
                  </div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search A City',
                      className: 'location-search-input',
                    })}
                    className={styles.input}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      console.log('suggestion', suggestions);
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          key={`suggestions-${suggestion.description}`}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </Box>
        </Toolbar>
      </AppBar>
      <div>
        <Grid container spacing={1} className={styles.list}>
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
                        {!props.user ? undefined : (
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
                                    userId: props.user.id,
                                  }),
                                });

                                const data = await response.json();
                                if (data.error) {
                                  setErrormsg(data.error);
                                  return errormsg;
                                }
                              } else {
                                const res = await fetch(
                                  `/api/delete/${place.name}`,
                                  {
                                    method: 'DELETE',
                                  },
                                );
                                const data = await res.json();
                                console.log('jsondata', data);
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
          <Grid item xs={12} md={7} className={styles.travelmap}>
            <TravelMap
              coords={coords}
              places={places}
              weatherIcon={weatherIcon}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
