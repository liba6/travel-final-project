

'use client'

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

const coordinates= {
  lat: 40.6690,
  lng: -73.9429
};
export default function TravelMap({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  // const [map, setMap] = useState(null)

  // const onLoad = useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [])

  // const onUnmount = useCallback(function callback() {
  //   setMap(null)
  // }, [])

  return isLoaded ? (
    <div className={styles.mapContainer}> 
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        defaultCenter={coordinates}
        zoom={8}
        margin={[50, 50, 50, 50]}
        options = {''}
         onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
         }}
         onChildClick={(child) => setChildClicked(child)}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
       <Marker position={coordinates} />
          </GoogleMap>
      </div>
  ) : <></>
}
