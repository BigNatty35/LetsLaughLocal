"use client"

import React from 'react';
import { deleteEvent } from '../actions';

export const DeleteEventButton = ({ eventId }: any) => {
  return (
    <div className="mr-8">
    <button className="items-center justify-center text-black bg-red-500 p-4 flex max-w-xs rounded-lg" onClick={() => deleteEvent(eventId)}>
      <p>Delete Event</p>
    </button>
  </div>
  );
};
