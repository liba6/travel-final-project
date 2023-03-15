'use client'

import {
  useEffect,
  useState,
} from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';

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
import FavoriteBorderOutlinedIcon
  from '@mui/icons-material/FavoriteBorderOutlined';

import getPlacesData from '../../../util/places';
import TravelMap from '../map/TravelMap';
import styles from './page.module.scss';

export default  function ListingAttractions() {
const [places, setPlaces] = useState ([]);
// const [apiData, setApiData] = useState('')
const [coords, setCoords] = useState({ });
// const [bounds, setBounds] = useState(null);
const [address, setAddress]= useState('');
const [selection, setSelection]= useState('');

// const [coordinates, setCoordinates] = useState({
//   lat:null,
//   lng:null
// })

const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const myToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const handleSelect = value => {
  // const results =  geocodeByAddress(value);
  // const ll =  getLatLng(results[0]);
  // console.log('results', results)
  // console.log('ll', ll);
  setSelection(value)
  setAddress(value)
  // setCoordinates(ll)
}


// api call to get current user location as starting point
useEffect(()=> {
 navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=> {
  setCoords([longitude,latitude])
 })
}, []);

// api call to convert given city to its coordinates
useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${selection}.json?access_token=${myToken}`,
    )
      .then((res) => res.json())
      .then((res) => res.features[1].geometry.coordinates)
      .then((res) => {setCoords(res)})
      .catch(() => console.log('Error'));
  
}, [selection, myToken]);

// console.log('coordslatlng', coords[0], coords[1])
// api call to get places for any given location
    useEffect (()=>{
      getPlacesData(coords)
      .then ((data)=> {
      // console.log('datalocations', data);
          setPlaces(data)
      } )

    },[
      coords
    ]);

  return (
    <div >
      <CssBaseline/>
            <script src={`https://maps.googleapis.com/maps/api/js?key=${myKey}&libraries=places`}/>

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
          <div className ={styles.searchArea}> 
            <div className={styles.searchIcon}>
             <SearchIcon />
             </div>
             <input
              {...getInputProps({
                placeholder: 'Search A City',
                className: 'location-search-input',
              })}
              className = {styles.input}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#6b6454', cursor: 'pointer' }
                  : { backgroundColor: '#9cb1d2', cursor: 'pointer' };
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
<div>

    <Grid container spacing={3} 
     className={styles.list}
    >
        <Grid item xs={12} md={5}>
        {places?.map((place, i) => (

         <Card elevation={6} key ={place.id} className={styles.card}>
           <CardMedia
        className={styles.cardmedia}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
           />
          <CardContent>
            <Box display= "flex" justifyContent="space-between">
          
           <Typography gutterBottom variant="h5">{place.name}</Typography>
           {/* <button className={styles.favorite}> */}
          <FavoriteBorderOutlinedIcon color="error" />
          {/* </button> */}
          </Box>
          <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">{place.price_level}</Typography>
          
         </Box>
                
        {place?.address && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" 
           className={styles.subtitle}
          >
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant = "subtitle2" color="textSecondary" 
          className={styles.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions className = {styles.cardActions}>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          {place.name} Website
        </Button>
      </CardActions>
    </Card>
    ))}
            </Grid>

<Grid item xs={12} md={7} className = {styles.travelmap}>
             <TravelMap
                  // setCoords={setCoords}
                  // setBounds= {setBounds}
                  coords={coords}
                  places = {places}
                /> 

</Grid>   
</Grid>
</div>
</div>
 )}
