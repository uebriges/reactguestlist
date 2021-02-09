/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
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
  const [eventLocation, setEventLocation] = useState('');
  const [eventName, setEventName] = useState<string>('');
  const [currentEventLocation, setCurrentEventLocation] = useState('');
  const [currentEventName, setCurrentEventName] = useState('');
  const [genericError, setGenericError] = useState('');
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
        eventLocation={eventLocation}
        eventName={eventName}
        setEventName={setEventName}
        setEventLocation={setEventLocation}
        setCurrentEventLocation={setCurrentEventLocation}
        setCurrentEventName={setCurrentEventName}
        genericError={genericError}
        setGenericError={setGenericError}
      />

      <EventArea
        baseUrl={baseUrl}
        setGuestList={setGuestList}
        guestList={guestList}
        loadGuests={loadGuests}
        setEventId={setEventId}
        eventId={eventId}
        currentEventLocation={currentEventLocation}
        currentEventName={currentEventName}
        genericError={genericError}
        setGenericError={setGenericError}
      />
    </div>
  );
}

export default App;
