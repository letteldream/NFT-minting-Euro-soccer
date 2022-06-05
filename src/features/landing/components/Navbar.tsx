import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React, { useRef } from 'react';

import eurosoccer from '@/assets/image/eurosoccer.png';

import { navigation } from '../utils/values';

const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop);

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
export const Navbar = () => {
  const executeScroll = (ref: string) => scrollToRef(ref);
  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="py-8 sm:px-12 xl:px-32">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:justify-between lg:justify-between">
                <div className="flex items-center flex-shrink-0">
                  <a data-toggle="tooltip" href="#" className="p-4 ml-0 leading-5 navbar-brand">
                    <img
                      data-sizes="auto"
                      className="img-responsive"
                      alt="Navbar Title"
                      title="Navbar Title"
                      src={eurosoccer}
                      width="212"
                      height="51"
                    />
                  </a>
                </div>
                <div className="hidden lg:block sm:ml-6 ">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white text-xl font-medium',
                          'px-3 lg:px-1 py-2 rounded-md text-sm text-center font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex">
                  <button className="hidden px-10 py-3 font-bold text-center text-white bg-green-600 rounded-tl-2xl rounded-br-2xl lg:block hover:bg-green-500">
                    MINT NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 text-center">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-center font-medium'
                  )}
                  onClick={() => executeScroll(item.ref)}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* <div>
                <button className="px-10 py-3 font-medium text-center text-white bg-green-500 rounded-md ali">
                  MINT NOW
                </button>
              </div> */}
              <div>
                <button className="px-10 py-3 font-medium text-center text-white bg-purple-900 rounded-md ali">
                  MINTNOW
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
