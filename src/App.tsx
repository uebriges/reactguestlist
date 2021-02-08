/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import './App.css';
import EventArea from './EventArea';
import Sidebar from './Sidebar';
import { AppStyles } from './Styles';

export interface IGuest {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  deadline: string;
}

function App() {
  const [guestList, setGuestList] = useState<IGuest[]>([]);
  const [eventId, setEventId] = useState(0);
  const baseUrl = 'http://localhost:5000';

  async function loadGuests(shouldReturn = false, id: number) {
    console.log('id: ', id);
    if (id) {
      const response = await fetch(`${baseUrl}/allEventGuests?id=${id}`);
      console.log('response: ', response);
      const allGuests = await response.json();
      console.log('in load guests: ', allGuests);

      console.log('loadGuests eventId: ', eventId);
      setEventId(id);
      setGuestList(allGuests);

      if (shouldReturn) {
        return allGuests;
      }
    } else {
      if (shouldReturn) {
        return [];
      }
    }
  }

  useEffect(() => {
    console.log('In useEffect in App.js');
    loadGuests(false, eventId);
  }, []);

  return (
    <div className="App" css={AppStyles}>
      <Sidebar
        baseUrl={baseUrl}
        setGuestList={setGuestList}
        guestList={guestList}
        loadGuests={loadGuests}
        setEventId={setEventId}
        eventId={eventId}
      />
      {eventId === 0 ? (
        <div>nothing selected</div>
      ) : (
        <EventArea
          baseUrl={baseUrl}
          setGuestList={setGuestList}
          guestList={guestList}
          loadGuests={loadGuests}
          setEventId={setEventId}
          eventId={eventId}
        />
      )}
    </div>
  );
}

export default App;
