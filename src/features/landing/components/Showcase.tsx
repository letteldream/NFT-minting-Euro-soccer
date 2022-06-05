import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import player1 from '@/assets/player/1.jpg';
import player10 from '@/assets/player/10.jpg';
import player11 from '@/assets/player/11.jpg';
import player12 from '@/assets/player/12.jpg';
import player13 from '@/assets/player/13.jpg';
import player14 from '@/assets/player/14.jpg';
import player15 from '@/assets/player/15.jpg';
import player16 from '@/assets/player/16.jpg';
import player2 from '@/assets/player/2.jpg';
import player3 from '@/assets/player/3.jpg';
import player4 from '@/assets/player/4.jpg';
import player5 from '@/assets/player/5.jpg';
import player6 from '@/assets/player/6.jpg';
import player7 from '@/assets/player/7.jpg';
import player8 from '@/assets/player/8.jpg';
import player9 from '@/assets/player/9.jpg';

export const Showcase = () => {
  return (
    <div>
      <div className="container-fluid">
        <OwlCarousel
          items={5}
          className="owl-theme"
          loop
          nav
          dots={false}
          margin={8}
          autoplay={true}
          autoplaySpeed={1000}
          autoplayTimeout={2000}
          smartSpeed={1000}
        >
          <div>
            <img className="border-2 border-green-900 img" src={player1} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player2} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player4} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player3} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player5} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player6} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player7} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player8} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player9} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player10} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player11} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player12} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player13} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player14} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player15} alt="player" />
          </div>
          <div>
            <img className="border-2 border-green-900 img" src={player16} alt="player" />
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};
