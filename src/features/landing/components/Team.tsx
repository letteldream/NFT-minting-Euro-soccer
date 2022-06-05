import React, { useRef } from 'react';

import avatar1 from '@/assets/avatar/1.jpg';
import avatar2 from '@/assets/avatar/2.png';
import avatar3 from '@/assets/avatar/3.png';

import { TeamMember } from './TeamMember';

export const Team = () => {
  const team = useRef(null);
  return (
    <div className="flex flex-col justify-center p-5 bg-black lg:p-10" ref={team} id="team">
      <p className="pb-10 font-bold text-4xl text-center text-white lg:text-5xl">Meet Our Team</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <TeamMember image={avatar1} title="Quin Lee" content="Project Manager" />
        <TeamMember image={avatar2} title="Rob Park" content="Blockchain Developer" />
        <TeamMember image={avatar3} title="Louis Lee" content="Frontend Developer" />
      </div>
    </div>
  );
};
