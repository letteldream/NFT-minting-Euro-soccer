import 'custom-react-accordion/dist/Accordion.css';
import React from 'react';

import { faq } from '../utils/values';

import './FAQ.css';

export const FAQ = () => {
  return (
    <div className="flex flex-col items-center p-10 bg-black lg:p-20">
      <p className="text-5xl font-bold text-white">FAQs</p>
      <div className="w-full p-8 mx-auto md:w-3/5">
        <div className="shadow-md">
          {faq.map((item, index) => (
            <div className="w-full overflow-hidden border-t rounded-xl tab" key={index}>
              <input
                className="absolute opacity-0 "
                id={'tab-multi-' + index}
                type="checkbox"
                name="tabs"
              />
              <label
                className="block p-5 text-2xl leading-normal text-gray-200 bg-green-600 cursor-pointer"
                htmlFor={'tab-multi-' + index}
              >
                {item.question}
              </label>
              <div className="overflow-hidden leading-normal bg-gray-900 tab-content">
                <p className="p-5 text-xl text-white">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
