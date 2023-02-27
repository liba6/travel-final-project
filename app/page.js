
export default function getRestaurantsDataVienna () {
  const axios = require("axios");

// api to get restaurants and their addresses in Vienna
  const options = {
    method: 'GET',
    url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/list',
    params: {queryPlaceValueCityId: '597321', pageSize: '10', pageNumber: '1'},
    headers: {
      'X-RapidAPI-Key': '2a9ed7a647mshfb4ab3e1468e295p10aac4jsna1239960128f',
      'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    const dataArr = response.data.data
    const restaurantNameAdd = dataArr.map((item)=> {return item.name + " " + item.address.street + " " + item.address.postalCode})
   console.log('list', restaurantNameAdd);
  }).catch(function (error) {
    console.error(error);
  });

  // api to get restaurants and their addresses in Jerusalem

  // api 

    // You should get your API key at https://opentripmap.io
    const apiKey = "5ae2e3f221c38a28845f05b62586f509eadc68302230e84ebb9f73e0";

    function apiGet(method, query) {
      return new Promise(function(resolve, reject) {
        var otmAPI =
          "https://api.opentripmap.com/0.1/en/places/" +
          method +
          "?apikey=" +
          apiKey;
        if (query !== undefined) {
          otmAPI += "&" + query;
        }
        fetch(otmAPI)
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(function(err) {
            console.log("Fetch Error :-S", err);
          });
      });
    }
    
return (
  <div>
  <h1>Trying to get apis asap!</h1>
</div>
)
}