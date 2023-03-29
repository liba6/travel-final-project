'use client';

import { Typography } from '@material-ui/core';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
};

const mapLibraries = ['places'];

// const isLargeScreen = window.innerWidth >= 600;

export default function TravelMap({ coords, places }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');

  const coordinates = {
    lat: coords[1],
    lng: coords[0],
  };

  const myKey = process.env.NEXT_PUBLIC_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&exclude=hourly,daily&appid=${myKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherIcon(data);
      })
      .catch(() => alert('error'));
  }, [url]);

  // console.log('weathericon', weatherIcon.current.weather[0].icon);
  // console.log('weather data', weatherIcon);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: mapLibraries,
  });

  const temp = Math.round(weatherIcon.current.temp - 273.15);
  // const placesRef = useRef(null);

  return isLoaded ? (
    <div className={styles.mapContainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        defaultCenter={coordinates}
        zoom={14}
        margin={[50, 50, 50, 50]}
        options=""
      >
        {places?.map((place) => (
          <Marker
            key={`place-${place.name}`}
            position={{
              lat: Number(place.latitude),
              lng: Number(place.longitude),
            }}
            onClick={() => {
              setSelectedPlace(place);
              placesRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            className={styles.paper}
            position={{
              lat: Number(selectedPlace.latitude),
              lng: Number(selectedPlace.longitude),
            }}
            onCloseClick={() => {
              setSelectedPlace(null);
            }}
          >
            <div>
              <Typography variant="subtitle2" gutterBottom>
                {selectedPlace.name}
              </Typography>
              <img
                className={styles.placeimg}
                alt={selectedPlace.name}
                src={
                  selectedPlace.photo
                    ? selectedPlace.photo.images.large.url
                    : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                }
              />
            </div>
          </InfoWindow>
        )}
        <div>
          <img
            className={styles.weatherIcon}
            src={`http://openweathermap.org/img/w/${weatherIcon.current.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p className={styles.weatherTemp}>{temp}*C</p>
        </div>
      </GoogleMap>
    </div>
  ) : (
    <div>'Loading Maps'</div>
  );
}
