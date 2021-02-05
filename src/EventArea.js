/** @jsxImportSource @emotion/react */
// ListHeader
// List
import { useState } from 'react';
import List from './List';
import ListHeader from './ListHeader';
import { EventAreaStyles } from './Styles';

export default function EventArea() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:5000';

  async function loadGuests(shouldReturn) {
    const response = await fetch(`${baseUrl}/`);
    const allGuests = await response.json();
    console.log('in load guests: ', allGuests);

    setGuestList(allGuests);
    if (shouldReturn) {
      return allGuests;
    }
  }

  return (
    <div>
      <div css={EventAreaStyles}>
        <ListHeader
          guestList={guestList}
          setGuestList={setGuestList}
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          loadGuests={loadGuests}
          baseUrl={baseUrl}
        />
        <List
          guestList={guestList}
          setGuestList={setGuestList}
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          loadGuests={loadGuests}
          baseUrl={baseUrl}
        />
      </div>
    </div>
  );
}
