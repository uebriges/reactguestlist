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
  const [eventId, setEventId] = useState<number>(0);
  const [eventLocation, setEventLocation] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [currentEventLocation, setCurrentEventLocation] = useState<string>('');
  const [currentEventName, setCurrentEventName] = useState<string>('');
  const baseUrl = 'http://localhost:5000';

  async function loadGuests(shouldReturn = false, id: number) {
    if (id) {
      const response = await fetch(`${baseUrl}/allEventGuests?id=${id}`);
      let allGuests = await response.json();
      allGuests = allGuests.map((guest: any) => {
        guest.attending = guest.attending === 'true' ? true : false;
        return guest;
      });
      console.log('allGuests: ', allGuests);
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
    loadGuests(false, eventId);
  }, [eventId]);

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
