'use client'

import {
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// import { Autocomplete } from '@react-google-maps/api';
// import useStyles from './styles';
import styles from './page.module.scss';

const Header = ({ onPlaceChanged, onLoad }) => {
  //  const classes  = useStyles();


  return (
    <AppBar position="static" className={styles.appbar}>
      <Toolbar 
       className={styles.toolbar}
      >
        <Typography variant="h5" 
         className={styles.title}
        > Attractions
        </Typography>
        <Box display="flex">
          <Typography variant="h6" 
         className={styles.title}
          />
        {/* //  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
            <div 
            className={styles.search}
            >
              <div 
              className={styles.searchIcon}
              >
                <SearchIcon />
              </div>
              <InputBase placeholder="Search A City" 
              className={styles.root } 
              />
            </div>
         {/* //</Box> </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;