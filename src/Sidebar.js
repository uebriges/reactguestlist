/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

// Create new Event
// List of Events available

export default function Sidebar(props) {
  const [eventLocation, setEventLocation] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventList, setEventList] = useState([]);
  // const [event, setEvent] = useState({});

  async function loadEvents(shouldReturn) {
    const response = await fetch(`${props.baseUrl}/events`);
    const allEvents = await response.json();
    console.log('in load events: ', allEvents);

    setEventList(allEvents);
    if (shouldReturn) {
      return allEvents;
    }
  }

  async function createEvent() {
    const response = await fetch(`${props.baseUrl}/newEvent`, {
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

  async function openGuestList(id) {
    console.log('id in openGuestList: ', id);
    props.loadGuests(false, id);
    // const response = await fetch(`${props.baseUrl}/allEventGuests:${id}`);
    // const allGuests = await response.json();
    // console.log('in load guests: ', allGuests);

    // props.setGuestList(allGuests);
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
}
