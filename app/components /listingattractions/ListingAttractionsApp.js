'use client'

import {
  useEffect,
  useState,
} from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';

// import Autocomplete from "react-google-autocomplete";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import TravelMap from '../map/TravelMap';
import styles from './page.module.scss';

export default  function ListingAttractions() {
// const [places, setPlaces] = useState ([]);
// const [apiData, setApiData] = useState('')
const [coords, setCoords] = useState({ });
// const [bounds, setBounds] = useState(null);
const [address, setAddress]= useState('');
// const [coordinates, setCoordinates] = useState({
//   lat:null,
//   lng:null
// })

const handleSelect = value => {
  // const results =  geocodeByAddress(value);
  // const ll =  getLatLng(results[0]);
  // console.log('results', results)
  // console.log('ll', ll);
  setAddress(value)
  // setCoordinates(ll)
  // Geocode.fromAddress("Eiffel Tower").then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
}

// console.log(handleSelect('london'))

useEffect(()=> {
 navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=> {
  setCoords({lat:latitude, lng:longitude})
 })
}, []);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${props.myKey}`,
//     )
//       .then((res) => res.json())
//       .then((res) => res.features[1].geometry.coordinates)
//       .then((res) => setApiData(res))
//       .catch(() => console.log('Error'));
//   }, 700);
//   return () => clearTimeout(timer);
// }, [address]);

// need to comment back in - just trying to avoid wasting api calls
    // useEffect (()=>{
    //   getPlacesData()
    //   .then ((data)=> {
    //   console.log('datalocations', data);
    //   setPlaces(data)
    //   } )

    // },[]);


const places = [
{name: 'cool beer'},
{name: 'chabad house'},
{name: 'adventure climbing'}
]
  
// Geocode.setApiKey("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
// useEffect (()=> {
// Geocode.fromAddress("eiffel tower").then(
//   (response) => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log('latandlng', lat, lng);
//   },
//   (error) => {
//     console.error(error);
//   }
// );
// })
const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div >

            <script src={`https://maps.googleapis.com/maps/api/js?key=${myKey}&libraries=places`}/>

    <p>lat:
      {/* {coordinates.lat} */}
      </p>
    <p> lng:
      {/* long:{coordinates.lng} */}
      </p>

      
        <AppBar position="static" className={styles.appbar}>
      <Toolbar 
       className={styles.toolbar}
      >
        <Typography variant="h5" 
         className={styles.title}
        > 
        Attractions in {`${address} `}
        </Typography>
        <Box display="flex">
          <Typography variant="h6" 
         className={styles.title}
          />
          
          <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            
             <SearchIcon />
             {/* </div>
              // input = {value}
              
              />
              
            </div> */}
             <input
              {...getInputProps({
                placeholder: 'Search A City',
                className: 'location-search-input',
              })}
              //         onChange ={(event)=>setCity(event.currentTarget.value)}
              // className={styles.root } 
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'tomato', cursor: 'pointer' }
                  : { backgroundColor: 'turquoise', cursor: 'pointer' };
                return (
                  <div
                  key={suggestions.description}

                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
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
  

          <Grid container spacing={3} >
            {places?.map((place) => (

              <Grid item key={place.name} xs={12} md={8}>
                {place.name}
              <FavoriteBorderIcon />
                 </Grid>
            ))}
              </Grid>
             <TravelMap
                  setCoords={setCoords}
                  // setBounds= {setBounds}
                  coords={coords}
                />

        {/* </> */}
    
</div>
  )}
