import React from 'react';

const getRandom = (min:number, max:number) => Math.random() * (max - min) + min;

function StarField({ count = 30 }) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const top = getRandom(0, 100);
    const left = getRandom(0, 100);
    const size = getRandom(2, 6); 
    return (
      <div
        key={i}
        className="star absolute bg-white rounded-full"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: getRandom(0.5, 1),
        }}
      />
    );
  });

  return (
    <div className="relative w-full h-full">
      {stars}
    </div>
  );
}

export default StarField;