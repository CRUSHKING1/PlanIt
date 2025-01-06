import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
   useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);
  const [PhotoUrl,setPhotoUrl]=useState();
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place?.placeName
      };
      const result = await GetPlaceDetails(data);
      if (result.data.places?.[0]?.photos?.[3]) {
        const photoName = result.data.places[0].photos[0].name;
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        console.log(PhotoUrl);
        setPhotoUrl(PhotoUrl);
      } else {
        console.warn('Photo not found or structure mismatch.');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };
  return (
    <a
    href={
      "https://www.google.com/maps/search/?api=1&query=" +
      place?.placeName +
      place?.placeAddress
    }
    target="_blank"
    rel="noopener noreferrer"
  >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 
        hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={PhotoUrl?PhotoUrl:'/PlaceHolder.jpg'}
          className="w-[130px] h-[130px] rounded-xl object-cover"
          alt="placeholder"
        />
        <div className="flex flex-col justify-between w-full">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2 text-sm">🕥 {place.travelTime}</h2>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
