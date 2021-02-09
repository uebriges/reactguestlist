/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { SidebarStyles } from './Styles';

// Create new Event
// List of Events available

interface IPropsSidebar {
  baseUrl: string;
  setGuestList: (guestList: []) => void;
  guestList: object[];
  loadGuests: (shouldReturn: boolean, id: number) => void;
  setEventId: (eventId: number) => void;
  eventId: number;
  eventLocation: string;
  eventName: string;
  setEventLocation: (eventLocation: string) => void;
  setEventName: (eventName: string) => void;
  setCurrentEventLocation: (currentEventLocation: string) => void;
  setCurrentEventName: (currentEventName: string) => void;
  setGenericError: (error: string) => void;
  genericError: string;
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
  eventLocation,
  eventName,
  setEventLocation,
  setEventName,
  setCurrentEventLocation,
  setCurrentEventName,
  setGenericError,
  genericError,
}) => {
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
    if (eventName && eventLocation) {
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

      setEventId(createdEvent.id);
      setEventList(eventListTemp);
      setCurrentEventName(createdEvent.eventName);
      setCurrentEventLocation(createdEvent.eventLocation);
      setEventName('');
      setEventLocation('');
      setGenericError('');
    } else {
      if (!eventName) {
        setGenericError('Event name not given.');
      } else if (!eventLocation) {
        setGenericError('Event location not given.');
      }
    }
  }

  async function openGuestList(id: number) {
    console.log('id in openGuestList: ', id);
    loadGuests(false, id);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div css={SidebarStyles}>
      <div className="SideBarHeader">
        <div>Event Manager 3000</div>
        <p>If you order now.... </p>
      </div>
      <div className="SideBarNewEvents">
        <input
          type="text"
          id="eventName"
          value={eventName}
          placeholder="Event name"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
        <input
          type="text"
          id="eventLocation"
          value={eventLocation}
          placeholder="Event location"
          onChange={(e) => {
            setEventLocation(e.target.value);
          }}
        />
        <button onClick={createEvent}>Create</button>
        <p>{genericError}</p>
      </div>
      <div className="SideBarExistingEvents">
        <ul>
          {eventList.map((element, id) => {
            return (
              <li key={'Event' + element.eventId}>
                <button
                  key={element.eventId}
                  onClick={(e) => {
                    console.log('element.eventId: ', element.eventId);
                    setCurrentEventLocation(element.eventLocation);
                    setCurrentEventName(element.eventName);
                    openGuestList(element.eventId);
                  }}
                >
                  {'Name: ' + element.eventName}
                  <br />
                  {'Location: ' + element.eventLocation}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
