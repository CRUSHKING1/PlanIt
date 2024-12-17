import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {doc,getDoc}from 'firebase/firestore'
import {db}from '@/service/firebaseconfg'
import { toast } from 'sonner'
import InfoSection from '/src/view-trip/components/InfoSection.jsx';
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'
function Viewtrip() {
  const {tripId}=useParams();
  const [trip,setTrip]=useState([]);
  useEffect(()=>{
   tripId&&GetTripData()
  },[tripId])
  // useEffect(() => {
  //   if (tripId) {
  //     GetTripData();
  //   }
  // }, [tripId]);

  /**
   * used to get trip info from firebase using tripId
   */
  const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists())
    {
      console.log("Document:",docSnap.data());
       setTrip(docSnap.data())
    }
    else{
    console.log("No such document");
    toast('No trip found')
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>Viewtrip : {tripId}
      {/*Information section*/}
      <InfoSection trip={trip}/>
      {/*Recommended Hotels*/}
      <Hotels trip={trip}/>
      {/*Daily plans*/}
      <PlacesToVisit trip={trip}/>
    </div>
  
  )
}

export default Viewtrip;