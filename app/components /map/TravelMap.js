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

export default function TravelMap({ coords, places }) {
  // const matches = useMediaQuery('(min-width:600px');

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

  return isLoaded ? (
    <div className={styles.mapContainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        defaultCenter={coordinates}
        zoom={12}
        margin={[50, 50, 50, 50]}
        options=""
      >
        {places?.map((place) => (
          <Marker
            key={`place-${place.id}`}
            position={{
              lat: coords[1],
              lng: coords[0],
            }}
            onClick={() => {
              setSelectedPlace(place);
            }}
          />
        ))}
        console.log('cords', coords); console.log('places', places);
        console.log('selectedPlace', selectedPlace)
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
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
                className={styles.pointer}
                alt={selectedPlace.name}
                src={
                  selectedPlace.photo
                    ? selectedPlace.photo.images.large.url
                    : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Attractions-Placeholder-001.jpg'
                }
              />
            </div>
          </InfoWindow>
        )}
        <Marker position={coordinates} />
      </GoogleMap>
    </div>
  ) : (
    <>''</>
  );
}
