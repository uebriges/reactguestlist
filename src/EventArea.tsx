/** @jsxImportSource @emotion/react */
// ListHeader
// List
import React, { useState } from 'react';
import { IGuest } from './App';
import List from './List';
import ListHeader from './ListHeader';
import { EventAreaStyles } from './Styles';

interface IPropsEventArea {
  baseUrl: string;
  setGuestList: (guestList: IGuest[]) => void;
  guestList: IGuest[];
  loadGuests: (shouldReturn: boolean, id: number) => void;
  setEventId: (eventId: number) => void;
  eventId: number;
}

const EventArea: React.FC<IPropsEventArea> = ({
  baseUrl,
  setGuestList,
  guestList,
  loadGuests,
  setEventId,
  eventId,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

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
          setEventId={setEventId}
          eventId={eventId}
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
};

export default EventArea;
