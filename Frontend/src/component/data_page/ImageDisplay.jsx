import React from 'react';

const ImageDisplay = ({ image }) => {
  const { name, creator, origin, source, description } = image;

  return (
    <div>
      <img src={source} alt={name} />
      <h2>{name}</h2>
      <ul>
        <li>Creator: {creator}</li>
        <li>Origin: {origin}</li>
        <li>Source: {source}</li>
        <li>Description: {description}</li>
      </ul>
    </div>
  );
};

export default ImageDisplay;