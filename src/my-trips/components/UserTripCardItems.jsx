import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItems({trip}) {
     useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);
  const [PhotoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const result = await GetPlaceDetails(data);
      if (result.data.places?.[0]?.photos?.[3]) {
        const photoName = result.data.places[0].photos[0].name;
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        console.log(PhotoUrl);
        setPhotoUrl(PhotoUrl);
      } else {
        console.warn("Photo not found or structure mismatch.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
    <img src={PhotoUrl?PhotoUrl:'/PlaceHolder.jpg'}alt="placeholder_image" className="object-cover rounded-xl h-[220px]" />
    <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} Days Trip with {trip?.userSelection?.budget} Budget</h2>
    </div>
</div>
</Link>

  )
}

export default UserTripCardItems