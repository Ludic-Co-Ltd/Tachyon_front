import React from 'react';

function StarRating({ rating , className}) {
  // Calculate the number of yellow stars based on the rating
  const yellowStars = Math.round(rating);
  // Create an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < yellowStars) {
      // Render a yellow star
      return <span key={index} className='text-amber-300'>&#9733;</span>;
    } else {
      // Render an outline star
      return <span key={index} className='text-neutral-300'>&#9733;</span>;
    }
  });

  return (
    <div className={`text-neutral-400 ${className}`}>
      {stars} {rating}
    </div>
  );
}

export default StarRating;
