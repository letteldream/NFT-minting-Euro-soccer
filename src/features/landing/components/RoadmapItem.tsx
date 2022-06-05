import React from 'react';

import { itemRoadmap } from '../types';
export const RoadmapItem = (item: itemRoadmap) => {
  const { period, content } = item;
  return (
    <div className="p-3 border border-white rounded-2xl">
      <p className="pb-2 text-3xl text-blue-400">{period}</p>
      {content.map((contentItem: any, index: any) => {
        return (
          <p key={index} className="max-w-xl text-xl text-white">
            - {contentItem}
          </p>
        );
      })}
    </div>
  );
};
