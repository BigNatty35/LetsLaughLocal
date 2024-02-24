"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApprovalStatus } from '@prisma/client';
import { eventType, openMicType }  from "../types";
import PendingEvent from "../(components)/PendingEvent";
import PendingOpenMic from '../(components)/PendingOpenMic';
export default  function Dashboard() {
  // create actions functions
  // * getPendingEventsAndOpenMics √
  // * approvePendingEvent()
  // * declinePendingEvent()
  // * approvePendingOpenMic()
  // * declinePendingOpenMic()
  // create API routes to handle request
  // api/approve-event/[id].ts
  // api/approve-openMic/[id].ts
  // iterate through and map each event & open mic to pendingComponent

  /**
   * this going to be a new approach so that we can the this component to refresh after an approval. 
   * we need to update the state after approving/declining a event/openmic. 
   * STEPS:
   * upon first loading of the page. 
   * fetch all of the pending events, and open mics
   * set store with fetched pending events/open mics. 
   * 
   * when user clicks approve button
   * send put request to api to update event/openmic approval status to App
   * send back updated ID, filter updated event out of state
   * component will re-render.
   * 
   * TODO
   * introduce 2 pieces of state to Dashboard Component
   *   eventState & openMicState
   *  use useEffect() to fetch data when the page first loads. 
   */
  const [events, setEvents] = useState<eventType[] | null>(null);
  const [openMics, setOpenMics] = useState<openMicType[] | null>(null);

  const fetchData = async () => {
    try {
      const eventResponse = await axios.get('/api/event');
      setEvents(eventResponse.data.events);
      
      console.log(eventResponse.data.events)

      const openMicResponse = await axios.get('/api/openMic');
      setOpenMics(openMicResponse.data.openMics);
      
      console.log(openMicResponse.data.openMics)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const approveEvent = async (eventId: number) => {
    try {
      await axios.put(`/api/event/${eventId}`, {data: { approvalStatus: ApprovalStatus.APPROVED }})
      if (events !== null) {
        const updatedEvents = events.filter((event: eventType) => event.id !== eventId)
        setEvents(updatedEvents)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const approveOpenMic = async (openMicId: number) => {
    try {
      await axios.put(`/api/openMic/${openMicId}`, {data: { approvalStatus: ApprovalStatus.APPROVED }})
      if (openMics !== null) {
        const updatedOpenMics = openMics.filter((openMic: openMicType) => openMic.id !== openMicId)
        setOpenMics(updatedOpenMics)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  
  return (
    <div>
      <h1>Dashboard page</h1>
      {events && (
        <div>
          <h2>Events</h2>
          {events.map((event: eventType) => (
          <PendingEvent
            key={event.id} 
            title={event.title}
            eventId={event.id}
            description={event.description}
            venue={event.venue_name}
            approveHandler={approveEvent}/>
        ))}
        </div>
        )}
      {openMics && (
        <div>
          <h2>Open Mics</h2>
        {openMics.map((openMic: openMicType) => (
          <PendingOpenMic
          key={openMic.id}
          openMicId={openMic.id}
          title={openMic.title}
          description={openMic.info}
          address={openMic.address}
          approveHandler={approveOpenMic}/>
          ))}
        </div>
      )}
    </div>
  )
}