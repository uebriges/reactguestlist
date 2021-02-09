/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import EventArea from './EventArea';
import Sidebar from './Sidebar';
import { appStyles } from './Styles';

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
  const [eventLocation, setEventLocation] = useState('');
  const [eventName, setEventName] = useState<string>('');
  const [currentEventLocation, setCurrentEventLocation] = useState('');
  const [currentEventName, setCurrentEventName] = useState('');
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
    <div className="App" css={appStyles}>
      <Sidebar
        baseUrl={baseUrl}
        setGuestList={setGuestList}
        loadGuests={loadGuests}
        setEventId={setEventId}
        eventLocation={eventLocation}
        eventName={eventName}
        setEventName={setEventName}
        setEventLocation={setEventLocation}
        setCurrentEventLocation={setCurrentEventLocation}
        setCurrentEventName={setCurrentEventName}
      />

      <EventArea
        baseUrl={baseUrl}
        setGuestList={setGuestList}
        guestList={guestList}
        loadGuests={loadGuests}
        eventId={eventId}
        currentEventLocation={currentEventLocation}
        currentEventName={currentEventName}
      />
    </div>
  );
}

export default App;
