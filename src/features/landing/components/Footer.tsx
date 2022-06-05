import React from 'react';

import discord from '@/assets/icon/discord.svg';
import medium from '@/assets/icon/medium.svg';
import telegram from '@/assets/icon/telegram.svg';
import logo from '@/assets/logo.svg';

import { navigation } from '../utils/values';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export const Footer = () => {
  return (
    <div>
      <div className="flex flex-row justify-between px-10 py-10 mx-auto bg-green-600 xl:px-32 bg-opacity-90">
        {/* <p className="text-sm text-gray-100">Copyright © 1984-2021 Quinstreet, Inc. </p> */}
        <div className="flex flex-row">
          <a
            className="inline-block mx-5 transition-all hover:opacity-70"
            href="https://t.me/EuroSoccerOfficial"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={telegram}
              alt="telegram"
              className="w-10 h-auto mx-5 transition-all hover:opacity-70"
            />
          </a>
          <a
            className="inline-block mx-5 transition-all hover:opacity-70"
            href="https://t.me/EuroSoccerOfficial"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={discord}
              alt="telegram"
              className="w-10 h-auto mx-5 transition-all hover:opacity-70"
            />
          </a>
          <a
            className="inline-block mx-5 transition-all hover:opacity-70"
            href="https://t.me/EuroSoccerOfficial"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={medium}
              alt="medium"
              className="w-10 h-auto mx-5 transition-all hover:opacity-70"
            />
          </a>
        </div>
        <div>
          {navigation.map((item) => {
            return (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:text-white text-xl font-medium outline-none',
                  'px-3 rounded-md text-sm text-center font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
