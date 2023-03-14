

'use client'

import { useMediaQuery } from '@material-ui/core';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

import styles from './page.module.scss';

const containerStyle = {
  width: '700px',
  height: '600px',
  borderRadius: '10px',
};

// const coordinates= {
//   lat: 40.6690,
//   lng: -73.9429
// };

export default function TravelMap({ coords, setCoords, 
   //setBounds
   }) {
    const isMobile = useMediaQuery('(min-width:600px')


    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
     libraries: ['places'],
  })



  return isLoaded ? (
    <div className={styles.mapContainer}> 
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords}
        defaultCenter={coords}
        zoom={12}
        margin={[50, 50, 50, 50]}
        options = {''}
        //  onBoundsChanged={(e) => {
        // //   // GoogleMap.getCenter()
        //   console.log('e', e)
        //   setCoords({ latitude: e.latitude, longitude: e.longitude });
          // setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        //  }}
         onLoad={map => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
          console.log('coords', coords)
          console.log('bounds', bounds)

        }}
        //  onChildClick={(child) => setChildClicked(child)}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
       <Marker position={coords} />
          </GoogleMap>
      </div>
  ) : <></>
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