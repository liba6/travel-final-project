import GoogleMapReact from 'google-map-react';

import styles from './page.module.scss';

//mport makeStyles from './page.module.scss'

// import { Paper, Typography, useMediaQuery } from '@material-ui/core';
// import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Rating from '@material-ui/lab/Rating';


export default function Map() {
     //const classes = useStyles();
    // const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = {lat: 40, lng: -73}
    
    return (
        <div className = {styles.map}
         //className = {classes.mapContainer}
        >
        <GoogleMapReact bootstrapURLKeys={{key:'', language:'en'}}
        defaultCenter = {coordinates}
        center= {coordinates}
        defaultZoom = {14}
        margin={[50,50,50,50]}
        // options ={''}
        // onChange={''}
        // onChildClick= {''}
        />
        
        {/* </GoogleMapReact> */}
        </div>
    )
}

// import React from 'react';

// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function Map(){
//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627
//     },
//     zoom: 11
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }
