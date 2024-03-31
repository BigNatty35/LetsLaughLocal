"use client"

import React from 'react';
import { deleteOpenMic } from '../actions';

export const DeleteOpenMicButton = ({ openMicId }: any) => {
  return (
    <div className="mr-8">
    <button className="items-center justify-center text-black bg-red-500 p-4 flex max-w-xs rounded-lg" onClick={() => deleteOpenMic(openMicId)}>
      <p>Delete Open Mic</p>
    </button>
  </div>
  );
};
