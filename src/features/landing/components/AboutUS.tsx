import React, { useRef } from 'react';

import about from '@/assets/image/aboutUS.png';

export const AboutUS = () => {
  const aboutUS = useRef(null);
  return (
    <div className="bg-black" ref={aboutUS} id="about">
      <div className="grid grid-cols-2 md:p-10 lg:p-20">
        <div className="col-span-2 md:col-span-1">
          <img src={about} alt="potato" className="object-contain w-full h-auto" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="flex items-center p-8 text-5xl font-bold text-white">
            Welcome all Soccer Enthusiasts!!
          </p>
          <p className="p-8 text-xl text-white">
            We are the real players in Europe top 5 football leagues. Our NFTs are unique,
            human-centered, and linked to the real football world.
            <br /> Our goal is to allow your Euro Soccer NFT to get you access to exclusive crypto
            events, experiences, and even the ability to meet famous influencers and celebrities.
            Buying and owning a Euro Soccer will grant you not only online benefits but also
            benefits inside the real world. You can see the details about it in Benefit Section.
          </p>
        </div>
      </div>
    </div>
  );
};
