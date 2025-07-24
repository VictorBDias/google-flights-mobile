import axios from 'axios';

const flightsApi = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/',
  headers: {
    'x-rapidapi-key': '751a9079d5mshcbd95ea789ea247p144515jsn9e5c988c4d6e',
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
  },
});

export default flightsApi;
