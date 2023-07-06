'use client';

import { CssBaseline, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Favorites, Place, User, WeatherData } from '../../../database/types';
import getPlacesData from '../../../util/places';
import AttractionsInfo from '../attractionsinfo/AttractionsInfo';
import TravelMap from '../map/TravelMap';
import SearchBar from '../searchbar/SearchBar';
import styles from './page.module.scss';

export type Props = {
  user: User;
  favorites: Favorites;
};

export default function ListingAttractions(props: Props) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [coords, setCoords] = useState<number[]>([]);
  const [address, setAddress] = useState('');
  const [selection, setSelection] = useState('');
  const [favorites, setFavorites] = useState(props.favorites);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: { temp: 0, weather: [{ icon: '' }] },
  });

  const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const myToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const myWeatherKey = process.env.NEXT_PUBLIC_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&exclude=hourly,daily&appid=${myWeatherKey}`;

  const handleSelect = (value: string) => {
    setSelection(value);
    setAddress(value);
  };

  // Fetch weather data - weather api
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // add a check to make sure data is not undefined before accessing its properties
          setWeatherData(data);
        }
      })
      .catch(() => alert('error'));
  }, [url]);

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
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${selection}.json?access_token=pk.eyJ1IjoibGlzYTYiLCJhIjoiY2xmOHU2bjRhMDI0OTNycWt3aGgzaDJkYiJ9.NKd0Y-1JRbn4ijW2r1ttZQ`,
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
    async function databaseFavorites() {
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
    databaseFavorites().catch((error) => {
      console.log(error);
    });
  }, [coords, favorites]);

  return (
    <div>
      <CssBaseline />
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${myKey}&libraries=places`}
      />

      <SearchBar
        address={address}
        setAddress={setAddress}
        onSelect={handleSelect}
      />

      <Grid container spacing={1} className={styles.list}>
        <AttractionsInfo
          places={places}
          properties={props}
          setPlaces={setPlaces}
        />

        <Grid item xs={12} md={7} className={styles.travelmap}>
          <TravelMap
            coords={coords}
            places={places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  );
}
