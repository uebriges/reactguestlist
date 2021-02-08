/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

// Create new Event
// List of Events available

interface IPropsSidebar {
  baseUrl: string;
  setGuestList: (guestList: []) => void;
  guestList: object[];
  loadGuests: (shouldReturn: boolean, id: number) => void;
  setEventId: (eventId: number) => void;
  eventId: number;
}

interface IEventLIst {
  eventId: number;
  eventLocation: string;
  eventName: string;
}

const Sidebar: React.FC<IPropsSidebar> = ({
  baseUrl,
  setGuestList,
  guestList,
  loadGuests,
  setEventId,
  eventId,
}) => {
  const [eventLocation, setEventLocation] = useState('');
  const [eventName, setEventName] = useState<string>('');
  const [eventList, setEventList] = useState<IEventLIst[]>([]);

  async function loadEvents(shouldReturn: boolean = false) {
    const response = await fetch(`${baseUrl}/events`);
    const allEvents = await response.json();
    console.log('in load events: ', allEvents);

    setEventList(allEvents);
    if (shouldReturn) {
      return allEvents;
    }
  }

  async function createEvent() {
    const response = await fetch(`${baseUrl}/newEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: eventName,
        eventLocation: eventLocation,
      }),
    });
    const createdEvent = await response.json();
    const eventListTemp = [...eventList, createdEvent];
    setEventList(eventListTemp);
  }

  async function openGuestList(id: number) {
    console.log('id in openGuestList: ', id);
    loadGuests(false, id);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <div>Create new events</div>
      <div>
        <label htmlFor="eventName">Event name</label>
        <input
          type="text"
          id="eventName"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
        <label htmlFor="eventLocation">Event location</label>
        <input
          type="text"
          id="eventLocation"
          onChange={(e) => {
            setEventLocation(e.target.value);
          }}
        />
        <button onClick={createEvent}>Create</button>
      </div>
      <div>
        <ul>
          {eventList.map((element, id) => {
            return (
              <div key={'Event' + element.eventId}>
                <button
                  key={element.eventId}
                  onClick={(e) => {
                    console.log('element.eventId: ', element.eventId);
                    openGuestList(element.eventId);
                  }}
                >
                  {element.eventName + ': ' + element.eventLocation}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
