/** @jsxImportSource @emotion/react */
// ListHeader
// List
import { useState } from 'react';
import List from './List';
import ListHeader from './ListHeader';
import { EventAreaStyles } from './Styles';

export default function EventArea(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <div css={EventAreaStyles}>
        <ListHeader
          guestList={props.guestList}
          setGuestList={props.setGuestList}
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          loadGuests={props.loadGuests}
          baseUrl={props.baseUrl}
          setEventId={props.setEventId}
          eventId={props.eventId}
        />
        <List
          guestList={props.guestList}
          setGuestList={props.setGuestList}
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          loadGuests={props.loadGuests}
          baseUrl={props.baseUrl}
        />
      </div>
    </div>
  );
}
