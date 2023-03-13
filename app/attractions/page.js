import AttractionsLocations
  from '../components /attractionlocations/AttractionsLocations';
import Header from '../components /header/Header';
// import ListingAttractions from '../components/listingattractions/ListingAttractions';
import List from '../components /list/List';
import TravelMap from '../components /map/TravelMap';

export default function Attraction() {
    
 return <div>
  {/* <h1>Pick A City</h1> */}
  <Header />
  <TravelMap/>
 <AttractionsLocations/>  
 {/* <ListingAttractions /> */}
  <List />
 </div>
}