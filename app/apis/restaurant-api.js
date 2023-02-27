export default function restaurantApis (){
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
  }
    // api to get restaurants and their addresses in Jerusalem