import React, { useRef } from 'react';

import ball from '@/assets/image/ball.png';

import { itemRoadmap } from '../types';

import { RoadmapItem } from './RoadmapItem';

// 1.
// 	-> Release of first collection (La Liga in Spain)
// 	-> NFT website launch
// 	-> NFT marketing initiatives and promotion (Discord/Telegram and other streams)
// 	-> NFT pre/public for mint
// 2.
// 	-> Release of new collection (Premier League in England, Ligue 1 in France)
// 	-> Use NFT Bot(Contract, OpenSea, Rarity Bot) on Our Site.

// 3.	-> Release of new collection (Bundesliga in Germany, Serie A in Italy)
// 	-> Running a live public lottery that will really help you on your Qatar World Cup trip.

// 4.	-> Growing our community is one of the most important aspects for our project
// 	-> In order to succeed as an NFT project we plan to bring in as many NFT investors as possible into the community and grow as a whole.
// 	-> In order to do this we will be carrying out as many effective and unsaturated marketing methods in the crypto space.

const Data: itemRoadmap[] = [
  {
    period: 'Q1 2022',
    content: [
      'Release of first collection (La Liga in Spain)',
      'NFT website launch and NFT marketing initiatives and promotion ( Discord / Telegram and other streams) ',
      'NFT pre/public for mint',
    ],
  },
  {
    period: 'Q2 2022',
    content: [
      'Release of new collection (Premier League in England, Ligue 1 in France)',
      'Use NFT Bot(Contract, OpenSea, Rarity Bot) on Our Site.',
      'This donation goes along with the theme of our project; under-water wildlife as Sharks especially are becoming more and more scarce by the minute.',
    ],
  },
  {
    period: 'Q3 2022',
    content: [
      'Release of new collection (Bundesliga in Germany, Serie A in Italy)',
      'Running a live public lottery that will really help you on your Qatar World Cup trip.',
    ],
  },
  {
    period: 'Q4 2022',
    content: [
      'Growing our community is one of the most important aspects for our project',
      'In order to succeed as an NFT project we plan to bring in as many NFT investors as possible into the community and grow as a whole.',
      'In order to do this we will be carrying out as many effective and unsaturated marketing methods in the crypto space.',
    ],
  },
];

const side = () => {
  return (
    <div className="flex flex-col items-center p-3 w-14">
      <img src={ball} alt="ball" className="w-full h-auto mb-3" />
      <div className="w-1 bg-white h-full"></div>
    </div>
  );
};
export const Roadmap = () => {
  const roadmap = useRef(null);
  return (
    <div className="flex flex-col items-center p-10 lg:p-20" ref={roadmap} id="roadmap">
      <p className="text-white text-5xl font-bold mb-3"> Roadmap</p>
      {Data.map((item: itemRoadmap, index) => (
        <div key={index} className="p-3 flex flex-row">
          {side()}
          <RoadmapItem period={item.period} content={item.content} />
        </div>
      ))}
    </div>
  );
};
