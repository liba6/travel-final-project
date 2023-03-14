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
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import SearchIcon from '@material-ui/icons/Search';

import getPlacesData from '../../api/travelAPI/route';
import styles from './page.module.scss';

export default  function ListingAttractions() {
const [places, setPlaces] = useState ([]);
// const [apiData, setApiData] = useState('')
const [coords, setCoords] = useState({ });
// const [bounds, setBounds] = useState(null);
const [address, setAddress]= useState('');
// const [coordinates, setCoordinates] = useState({
//   lat:null,
//   lng:null
// })

const myKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const myToken = process.env.MAPBOX_API_KEY

const handleSelect = value => {
  // const results =  geocodeByAddress(value);
  // const ll =  getLatLng(results[0]);
  // console.log('results', results)
  // console.log('ll', ll);
  setAddress(value)
  // setCoordinates(ll)
}

// console.log(handleSelect('london'))

// api call to get current user location as starting point
useEffect(()=> {
 navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=> {
  setCoords({lat:latitude, lng:longitude})
 })
}, []);

// api call to convert given city to its coordinates

useEffect(() => {
  const timer = setTimeout(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${myToken}`,
    )
      .then((res) => res.json())
      .then((res) => res.features[1].geometry.coordinates)
      .then((res) => setCoords(res))
      .catch(() => console.log('Error'));
  }, 700);
  return () => clearTimeout(timer);
}, [address, myToken]);

console.log('coords', coords)
// api call to get places for any given location
    useEffect (()=>{
      getPlacesData()
      .then ((data)=> {
      console.log('datalocations', data);
      setPlaces(data)
      } )

    },[]);


// const places = [
// {name: 'cool beer'},
// {name: 'chabad house'},
// {name: 'adventure climbing'}
// ]
  

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
<div>
    <Grid container spacing={3} 
     className={styles.list}
    >
            {places?.map((place, i) => (
              <Grid  key={place.name} item xs={12}>
    <Card elevation={6}key = {place.id}>
      <CardMedia
        className={styles.cardmedia}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>

        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
         
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" 
          // className={classes.subtitle}
          >
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" 
          //className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
        </Grid>
    ))}

          {/* <Grid container spacing={3} >
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
                /> */}

        {/* </> */}
 </Grid>   
 </div>
</div>
 )}
