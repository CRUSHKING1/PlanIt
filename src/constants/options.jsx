export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '🧍‍♂️',
      people: '1 people'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two traveling in tandem',
      icon: '👫',
      people: '2 People'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '👨‍👩‍👧‍👦',
      people: '3 to 5 People'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A group of close companions on an adventure',
      icon: '👬',
      people: '3 to 8 People'
    }
  ];
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💸'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Keep costs on the average side',
      icon: '💵'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Enjoy the finest experiences',
      icon: '💎'
    }
  ];
  export const AI_PROMPT='Generate Travel Plan for Location:{location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'