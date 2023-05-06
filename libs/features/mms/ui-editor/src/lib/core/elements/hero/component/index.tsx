import React from 'react';

import { HeroComponentProps } from '../../types';

const CardComponent: React.FC<HeroComponentProps> = ({ id, imageUrl, title }) => {
  //const mobileWidth = 375;
  const mobileHeight = 812;

  return (
    <div
      id={id}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // width: width ? width : mobileWidth,
        height: mobileHeight,
        // width: width ? width : mobileWidth,
        //height: height ? height : mobileHeight,
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};
export default CardComponent;
