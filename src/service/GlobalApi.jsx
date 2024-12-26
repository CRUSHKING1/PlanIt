import axios from 'axios';

// Define the base URL for the Google Places API.
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

// Configuration object for axios headers.
const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY, // Ensure VITE_GOOGLE_PLACE_API_KEY is defined
    'X-Goog-FieldMask': [ // Correct the typo in the header key
      'places.photos', 
      'places.displayName', 
      'places.id'
    ]
  }
};

// Exported function to get place details.
export const GetPlaceDetails = (data) => {
  return axios.post(BASE_URL, data, config); // Make a POST request with data and config.
};
export const PHOTO_REF_URL =`https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;