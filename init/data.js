const sampleListings = [
  {
    "title": "Modern Family Home",
    "description": "A spacious and contemporary home perfect for families, featuring an open-plan kitchen and large backyard.",
    "image": {
      "url": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      "filename": "modern-home.jpg"
    },
    "price": 400000,
    "location": "Dallas, Texas",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05c9",
    "geometry": {
      "type": "Point",
      "coordinates": [-96.7969, 32.7767]
    }
  },
  
  {
    "title": "Cozy Studio Apartment",
    "description": "Compact and cozy studio, ideal for singles or couples, located in the heart of the city.",
    "image": {
      "url": "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
      "filename": "studio.jpg"
    },
    "price": 150000,
    "location": "Chicago, Illinois",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05cb",
    "geometry": {
      "type": "Point",
      "coordinates": [-87.6298, 41.8781]
    }
  },
  {
    "title": "Rustic Farmhouse",
    "description": "Charming farmhouse with vintage interiors, perfect for those seeking tranquility in the countryside.",
    "image": {
      "url": "https://images.pexels.com/photos/259948/pexels-photo-259948.jpeg",
      "filename": "farmhouse.jpg"
    },
    "price": 250000,
    "location": "Vermont",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05cc",
    "geometry": {
      "type": "Point",
      "coordinates": [-72.5778, 44.5588]
    }
  },
  {
    "title": "Urban Townhouse",
    "description": "A modern townhouse in a bustling neighborhood, offering convenience and style.",
    "image": {
      "url": "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      "filename": "townhouse.jpg"
    },
    "price": 300000,
    "location": "Seattle, Washington",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05cd",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.3321, 47.6062]
    }
  },
  {
    "title": "Beachfront Villa",
    "description": "A luxurious villa overlooking the ocean, with private access to the beach.",
    "image": {
      "url": "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
      "filename": "villa.jpg"
    },
    "price": 800000,
    "location": "Miami, Florida",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05ce",
    "geometry": {
      "type": "Point",
      "coordinates": [-80.1918, 25.7617]
    }
  },
  {
    "title": "Minimalist Condo",
    "description": "Stylish and minimalist condo in a vibrant area, close to shops and restaurants.",
    "image": {
      "url": "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "filename": "condo.jpg"
    },
    "price": 350000,
    "location": "San Francisco, California",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05cf",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749]
    }
  },
  {
    "title": "Suburban Bungalow",
    "description": "A classic suburban bungalow with a spacious garden and cozy interiors.",
    "image": {
      "url": "https://images.pexels.com/photos/259597/pexels-photo-259597.jpeg",
      "filename": "bungalow.jpg"
    },
    "price": 220000,
    "location": "Austin, Texas",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05d0",
    "geometry": {
      "type": "Point",
      "coordinates": [-97.7431, 30.2672]
    }
  },
  {
    "title": "Luxury Penthouse",
    "description": "A stunning penthouse with panoramic city views and high-end amenities.",
    "image": {
      "url": "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
      "filename": "penthouse.jpg"
    },
    "price": 1200000,
    "location": "New York City, New York",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05d1",
    "geometry": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    }
  },
  {
    "title": "Secluded Cabin",
    "description": "A rustic cabin surrounded by nature, perfect for a peaceful retreat.",
    "image": {
      "url": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      "filename": "cabin.jpg"
    },
    "price": 180000,
    "location": "Asheville, North Carolina",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05d2",
    "geometry": {
      "type": "Point",
      "coordinates": [-82.5515, 35.5951]
    }
  },
  
  {
    "title": "Historic Mansion",
    "description": "An elegant historic mansion with timeless architecture and luxurious features.",
    "image": {
      "url": "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg",
      "filename": "mansion.jpg"
    },
    "price": 2500000,
    "location": "Charleston, South Carolina",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05d4",
    "geometry": {
      "type": "Point",
      "coordinates": [-79.9311, 32.7765]
    }
  },
 
 
  {
    "title": "Beach Bungalow",
    "description": "A cozy bungalow just steps away from the beach, with great ocean views.",
    "image": {
      "url": "https://images.pexels.com/photos/271642/pexels-photo-271642.jpeg",
      "filename": "beach-bungalow.jpg"
    },
    "price": 350000,
    "location": "San Diego, California",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05d8",
    "geometry": {
      "type": "Point",
      "coordinates": [-117.1611, 32.7157]
    }
  },
  {
    "title": "Contemporary Home",
    "description": "A beautifully designed contemporary home with an open layout.",
    "image": {
      "url": "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg",
      "filename": "contemporary-home.jpg"
    },
    "price": 600000,
    "location": "Phoenix, Arizona",
    "country": "USA",
    "owner": "64a8e27f5b61a900145f05da",
    "geometry": {
      "type": "Point",
      "coordinates": [-112.0740, 33.4484]
    }
  }

];

module.exports = { data: sampleListings };
