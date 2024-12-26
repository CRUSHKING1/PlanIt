import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function HotelCardItem({ hotel }) {
     useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);
  const [PhotoUrl,setPhotoUrl]=useState();
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName + hotel?.hotelAddress
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
    <Link
      to={
        "https:www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <div>
          <img
            src={PhotoUrl?PhotoUrl:'/PlaceHolder.jpg'}

            alt="placeholder image"
            className="rounded-xl h-[180px] w-full object-cover"
          />
          <div className="my-2 flex flex-col ">
            <h2 className="font-medium">{hotel?.hotelName}</h2>
            <h2 className="font-xs  text-gray-500">📍 {hotel?.hotelAddress}</h2>
            <h2 className="text-sm">💰 {hotel?.price} USD per night</h2>
            <h2 className="text-sm">⭐{hotel?.rating} stars</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
