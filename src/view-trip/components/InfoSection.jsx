import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

function InfoSection({ trip }) {
  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);
  const [PhotoUrl,setPhotoUrl]=useState();
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      };
      const result = await GetPlaceDetails(data);
      if (result.data.places?.[0]?.photos?.[3]) {
        const photoName = result.data.places[0].photos[1].name;
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
    <div>
      <img src={PhotoUrl} className='h-[340px] w-full object-cover rounded' alt="vacation image" />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📆 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              🥂 No of Traveller: {trip?.userSelection?.traveller}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
