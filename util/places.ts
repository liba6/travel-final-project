import axios from 'axios';

// api call to get attractions by coordinates
export default async function getPlacesData(coords: number[]) {
  try {
    const {
      data: { data },
    } = await axios.get(
      'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
      {
        params: {
          longitude: coords[0],
          latitude: coords[1],
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_TRAVEL_API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      },
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
