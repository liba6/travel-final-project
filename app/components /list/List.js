'use client'
import { Grid } from '@material-ui/core';

// import useStyles from './styles.js';
import styles from './page.module.scss';

const List = () => {
  // const [elRefs, setElRefs] = useState([]);
//   const classes = useStyles();

// const length = places.length;
//   useEffect(() => {
//     setElRefs((refs) => Array(length).fill().map((_, i) => refs[i] || createRef()));
//   }, [places]);


const places = [
{name: 'cool beer'},
{name: 'chabad house'},
{name: 'adventure climbing'}


]
  

  return (
    <div className={styles.container}>
      {/* <Typography variant="h4"> Attractions near you</Typography> */}
      {/* {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <> */}
          <Grid container spacing={3} className={styles.list}>
            {places?.map((place) => (

              <Grid item key={place.name} xs={12}>
                {place.name}
                {/* <PlaceDetails place={place} /> */}
              </Grid>
            ))}
          </Grid>
        {/* </> */}
    
    </div>
  );
}; 

export default List;

