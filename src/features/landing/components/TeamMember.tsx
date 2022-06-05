import React from 'react';

import { member } from '..';

export const TeamMember = (member: member) => {
  return (
    <div className="flex flex-col items-center max-w-xl h-auto p-10 rounded-2xl">
      <img
        src={member.image}
        width="220"
        height="220"
        alt="avatar"
        className="rounded-full border-green-600 border-6"
      />
      <p className="text-white font-bold text-2xl p-6 text-center">{member.title}</p>
      <p className="text-white text-xl">{member.content}</p>
    </div>
  );
};
