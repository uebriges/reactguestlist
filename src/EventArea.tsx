/** @jsxImportSource @emotion/react */
// ListHeader
// List
import React, { useState } from 'react';
import { IGuest } from './App';
import List from './List';
import ListHeader from './ListHeader';
import { EmptyEventAreaStyles, EventAreaStyles } from './Styles';

interface IPropsEventArea {
  baseUrl: string;
  setGuestList: (guestList: IGuest[]) => void;
  guestList: IGuest[];
  loadGuests: (shouldReturn: boolean, id: number) => void;
  setEventId: (eventId: number) => void;
  eventId: number;
  currentEventLocation: string;
  currentEventName: string;
  genericError: string;
  setGenericError: (error: string) => void;
}

const EventArea: React.FC<IPropsEventArea> = ({
  baseUrl,
  setGuestList,
  guestList,
  loadGuests,
  setEventId,
  eventId,
  currentEventLocation,
  currentEventName,
  genericError,
  setGenericError,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  console.log(eventId);

  return (
    <div css={EventAreaStyles}>
      {eventId === 0 ? (
        <div css={EmptyEventAreaStyles}>
          <p>
            Please create a new Event
            <br />
            OR
            <br />
            Chose an existing one.
          </p>
        </div>
      ) : (
        <>
          <ListHeader
            guestList={guestList}
            setGuestList={setGuestList}
            loadGuests={loadGuests}
            baseUrl={baseUrl}
            setEventId={setEventId}
            eventId={eventId}
            currentEventLocation={currentEventLocation}
            currentEventName={currentEventName}
            genericError={genericError}
            setGenericError={setGenericError}
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
        </>
      )}
    </div>
  );
};

export default EventArea;
