'use client';

import { Typography } from '@material-ui/core';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useState } from 'react';
import styles from './page.module.scss';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
};

// const mapLibraries = ['places'];

// const isLargeScreen = window.innerWidth >= 600;

export default function TravelMap({
  coords,
  places,
  weatherIcon,
  setChildClicked,
}) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const coordinates = {
    lat: coords[1],
    lng: coords[0],
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const temperature =
    weatherIcon && Math.round(weatherIcon.current?.temp - 273.15);

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
        {/* <div ref={placesRef}> */}
        {places?.map((place) => (
          <Marker
            key={`place-${place.name}`}
            position={{
              lat: Number(place.latitude),
              lng: Number(place.longitude),
            }}
            onChildClick={(child) => setChildClicked(child)}
            onClick={() => {
              setSelectedPlace(place);
            }}
          />
        ))}
        {/* </div> */}
        {selectedPlace && (
          <InfoWindow
            className={styles.paper}
            position={{
              lat: Number(selectedPlace.latitude),
              lng: Number(selectedPlace.longitude),
            }}
            onCloseClick={() => {
              setSelectedPlace(null);
              // console.log('placesrefclose', placesRef.current);
            }}
          >
            <div className={styles.popup}>
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
        {temperature ? (
          <div>
            <img
              className={styles.weatherIcon}
              src={`http://openweathermap.org/img/w/${weatherIcon.current?.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p className={styles.weatherTemp}>{temperature}*C</p>
          </div>
        ) : null}
      </GoogleMap>
    </div>
  ) : (
    <div>'Loading Maps'</div>
  );
}