import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng'

const options = {
  params: {

    latitude: '40.6690',
    longitude: '-73.9429',
      },
  headers: {
    'X-RapidAPI-Key':process.env.NEXT_PUBLIC_RAPID_API_TRAVEL_API_KEY,

    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};
// Commenting out to avoid maxing out my api calls :()
export default async function getPlacesData () {
  try {
    const {data: {data} } = await axios.get(URL, options);
    return data;

  } 
  catch(error){
    console.log('error', error)
  }
  }


// // const options = {
// //   params: {
// //     bl_latitude: '11.847676',
// //     tr_latitude: '12.838442',
// //     bl_longitude: '109.095887',
// //     tr_longitude: '109.149359',
// //   },
// //   headers: {
// //     'X-RapidAPI-Key': process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
// //     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
// //   }
// // };

// // export const getPlacesData = async() => {
// //     try {
// //         const {data:{data}} = await axios.get(URL, options);
// //         return data;
// //     } catch(error){
// //         console.log(error)
// //     }
// // }
// // // axios.request(options).then(function (response) {
// // // 	console.log(response.data);
// // // }).catch(function (error) {
// // // 	console.error(error);
// // // });

