'use client';

import { Paper, Typography } from '@material-ui/core';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import styles from './page.module.scss';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
};

export default function TravelMap({ coords, places }) {
  // const matches = useMediaQuery('(min-width:600px');

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
        //  onBoundsChanged={(e) => {
        // //   // GoogleMap.getCenter()
        //   console.log('e', e)
        //   setCoords({ latitude: e.latitude, longitude: e.longitude });
        // setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        //  }}
        //  onLoad={map => {
        //   const bounds = new window.google.maps.LatLngBounds();
        //   map.fitBounds(bounds);
        //   // console.log('coords', coords)
        //   // console.log('bounds', bounds)

        // }}
        //  onChildClick={(child) => setChildClicked(child)}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {places?.map((place) => (
          // <div
          //   className={styles.markerContainer}
          //   // lat = {Number(coords[1])}
          //   // lng = {Number(coords[0])}
          //   key={place.id}
          <div key={`place-${place.id}`}>
            className={styles.markerContainer}
            {/* {matches ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : ( */}
            <Paper elevation={3} className={styles.paper}>
              <Typography variant="subtitle2" gutterBottom>
                {place.name}
              </Typography>
              <img
                className={styles.pointer}
                alt={place.name}
                src={
                  place.photo
                    ? place.photo.images.large.url
                    : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Attractions-Placeholder-001.jpg'
                }
              />
            </Paper>
            {/* )} */}
          </div>
        ))}
        <Marker position={{ coordinates }} />
      </GoogleMap>
    </div>
  ) : (
    <>''</>
  );
}

// const PlacesAutocomplete = ({setSelected}) => {
//   const {
//     ready,
// value,
// setValue,
// suggestions:{status, data},
// clearSuggestions,
//   } = usePlacesAutocomplete ();

//   return <Combobox>
//     <ComboboxInput  value ={value}/>
//   </Combobox>
// }
