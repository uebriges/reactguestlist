/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from 'react';
import deleteLogo from './delete-button.svg';
import { sidebarStyles } from './Styles';

// Create new Event
// List of available events (button to chose)
// More then Stretch: Delete Event

interface IPropsSidebar {
  baseUrl: string;
  setGuestList: (guestList: []) => void;
  loadGuests: (shouldReturn: boolean, id: number) => void;
  setEventId: (eventId: number) => void;
  eventLocation: string;
  eventName: string;
  setEventLocation: (eventLocation: string) => void;
  setEventName: (eventName: string) => void;
  setCurrentEventLocation: (currentEventLocation: string) => void;
  setCurrentEventName: (currentEventName: string) => void;
}

interface IEventLIst {
  eventId: number;
  eventLocation: string;
  eventName: string;
}

const Sidebar: React.FC<IPropsSidebar> = ({
  baseUrl,
  setGuestList,
  loadGuests,
  setEventId,
  eventLocation,
  eventName,
  setEventLocation,
  setEventName,
  setCurrentEventLocation,
  setCurrentEventName,
}) => {
  const [eventList, setEventList] = useState<IEventLIst[]>([]);
  const [
    eventLocationOrNameMissingErr,
    setEventLocationOrNameMissingErr,
  ] = useState('');

  const loadEvents = useCallback(
    async (shouldReturn: boolean = false) => {
      const response = await fetch(`${baseUrl}/events`);
      const allEvents = await response.json();

      setEventList(allEvents);
      if (shouldReturn) {
        return allEvents;
      }
    },
    [baseUrl],
  );

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

      setEventId(createdEvent.eventId);
      setEventList(eventListTemp);
      setCurrentEventName(createdEvent.eventName);
      setCurrentEventLocation(createdEvent.eventLocation);
      setEventName('');
      setEventLocation('');
      setEventLocationOrNameMissingErr('');
      setGuestList([]);
    } else {
      if (!eventName) {
        setEventLocationOrNameMissingErr('Event name not given.');
      } else if (!eventLocation) {
        setEventLocationOrNameMissingErr('Event location not given.');
      }
    }
  }

  async function deleteEvent(eventId: string) {
    if (eventId) {
      await fetch(`${baseUrl}/deleteEvent/${eventId}`, {
        method: 'DELETE',
      });

      const updatedEventList = eventList.filter((element) => {
        return !(element.eventId.toString() === eventId);
      });

      setEventList(updatedEventList);
      setEventId(0);
    }
  }

  async function openGuestList(id: number) {
    loadGuests(false, id);
  }

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <div css={sidebarStyles}>
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              (document.getElementById(
                'createEventBtn',
              ) as HTMLButtonElement).click();
            }
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              (document.getElementById(
                'createEventBtn',
              ) as HTMLButtonElement).click();
            }
          }}
        />
        <button id="createEventBtn" onClick={createEvent}>
          Create
        </button>
        <p>{eventLocationOrNameMissingErr}</p>
      </div>
      <div className="SideBarExistingEvents">
        <ul>
          {eventList.map((element) => {
            return (
              <li key={'Event' + element.eventId}>
                <button
                  key={element.eventId}
                  onClick={() => {
                    setCurrentEventLocation(element.eventLocation);
                    setCurrentEventName(element.eventName);
                    openGuestList(element.eventId);
                  }}
                >
                  {'Name: ' + element.eventName}
                  <br />
                  {'Location: ' + element.eventLocation}
                </button>
                <button
                  id={'deleteEvent' + element.eventId}
                  className="deleteEvent"
                  onClick={() => {
                    deleteEvent(element.eventId.toString());
                  }}
                >
                  <img
                    id={'deleteEventImg' + element.eventId}
                    src={deleteLogo}
                    alt="Delete single guest"
                    height="15px"
                    className="deleteEventImg"
                  />
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
