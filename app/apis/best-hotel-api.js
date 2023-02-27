export default function bestHotel ()  {
// best hotel in nyc
const options = {
  method: 'GET',
  url: 'https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation',
  params: {cityName: 'nyc', countryName: 'usa'},
  headers: {
    'X-RapidAPI-Key': '2a9ed7a647mshfb4ab3e1468e295p10aac4jsna1239960128f',
    'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}