import React from 'react';

import discord from '@/assets/icon/discord.svg';
import medium from '@/assets/icon/medium.svg';
import telegram from '@/assets/icon/telegram.svg';
import hero from '@/assets/image/hero.png';

export const Hero = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={hero} alt="hero" className="w-full h-auto" />
      <div className="flex flex-row justify-center">
        <a
          className="inline-block transition-all hover:opacity-70"
          href="https://t.me/EuroSoccerOfficial"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={telegram}
            alt="telegram"
            className="w-12 h-auto transition-all m-14 hover:opacity-70"
          />
        </a>
        <a
          className="inline-block transition-all hover:opacity-70"
          href="https://t.me/EuroSoccerOfficial"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={discord}
            alt="telegram"
            className="w-12 h-auto transition-all m-14 hover:opacity-70"
          />
        </a>
        <a
          className="inline-block transition-all hover:opacity-70"
          href="https://t.me/EuroSoccerOfficial"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={medium}
            alt="medium"
            className="w-12 h-auto transition-all m-14 hover:opacity-70"
          />
        </a>
      </div>
      <a href="https://opensea.com" target="_blank" rel="noreferrer">
        <button className="hidden px-10 py-3 text-2xl font-bold text-center text-white bg-blue-600 rounded-tl-2xl rounded-br-2xl lg:block hover:bg-green-500">
          Opensea
        </button>
      </a>
    </div>
  );
};
