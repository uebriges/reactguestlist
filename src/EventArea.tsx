/** @jsxImportSource @emotion/react */
// ListHeader
// List
import React from 'react';
import { IGuest } from './App';
import List from './List';
import ListHeader from './ListHeader';
import { emptyEventAreaStyles, eventAreaStyles } from './Styles';

interface IPropsEventArea {
  baseUrl: string;
  setGuestList: (guestList: IGuest[]) => void;
  guestList: IGuest[];
  loadGuests: (shouldReturn: boolean, id: number) => void;
  eventId: number;
  currentEventLocation: string;
  currentEventName: string;
}

const EventArea: React.FC<IPropsEventArea> = ({
  baseUrl,
  setGuestList,
  guestList,
  loadGuests,
  eventId,
  currentEventLocation,
  currentEventName,
}) => {
  return (
    <div css={eventAreaStyles}>
      {eventId === 0 ? (
        <div css={emptyEventAreaStyles}>
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
            eventId={eventId}
            currentEventLocation={currentEventLocation}
            currentEventName={currentEventName}
          />
          <List
            guestList={guestList}
            setGuestList={setGuestList}
            baseUrl={baseUrl}
          />
        </>
      )}
    </div>
  );
};

export default EventArea;
