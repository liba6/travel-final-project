

'use client'
import {
  useCallback,
  useState,
} from 'react';

import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';

import styles from './page.module.scss';

const containerStyle = {
  width: '700px',
  height: '600px'
};

const center = {
  lat: 40.6690,
  lng: -73.9429
};
export default function TravelMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className={styles.mapContainer}> 
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        margin={[50, 50, 50, 50]}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >

{/*         

        const marker = new google.maps.Marker({
        position: lat:42.4668, lng:-70.9495,
        map:map
}); */}


        {/* /* Child components, such as markers, info windows, etc. */ } 
        <></>
      </GoogleMap>
      </div>
  ) : <></>
}

