import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../button';
function Hero() {
  return (
    <div className="flex flex-col items-center mx-auto max-w-4xl gap-9 p-6">
  <h2 className="font-extrabold text-4xl md:text-5xl text-center mt-2">
    <span className="text-green-500">Discover Your Next Adventure with AI:</span><br />
    Personalized Itineraries at Your Fingertips
  </h2>
  <p className="text-lg md:text-xl text-gray-500 text-center">
    Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
  </p>
  <Link to="/create-trip">
    <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-6 py-3">
      Get Started it's Free
    </Button>
  </Link>
  <div className="mt-8">
    <img src="/demo.png" alt="demo_picture" className="w-full h-auto" />
  </div>
</div>

  )
}

export default Hero;