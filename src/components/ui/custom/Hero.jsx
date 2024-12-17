import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../button';
function Hero() {
  return (
    <div div className='flex flex-col items-center mx-56 gap-9'>
      <h2 className='font-extrabold text-[42px] text-center mt-16'><span className='text-[#40FF40]'>Discover Your Next Adventure with Al:</span><br />Personalized Itineraries at Your Fingertips</h2>
      <p className='text-xl text-gray-500 text-center'>Your personal tip planner and travel curator, creating custom Itineraries tailored to your interests and budget.</p>
      <Link to={"/create-trip"}>
    <Button>Get Started it's Free</Button>
    </Link>
    </div>
  )
}

export default Hero;