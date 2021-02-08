/** @jsxImportSource @emotion/react */
// Show Event name + Location
// Add new guest
// Filter

import React from 'react';
import {
  addUserAndFilterStyles,
  eventInfoStyles,
  ListHeaderStyles,
} from './Styles';

interface IGuest {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  deadline: string;
}

interface IPropsListHeader {
  guestList: object[];
  setGuestList: (guestList: IGuest[]) => void;
  firstName: string;
  lastName: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  loadGuests: (shouldReturn: boolean, id: number) => any;
  baseUrl: string;
  setEventId: (eventId: number) => void;
  eventId: number;
}

const ListHeader: React.FC<IPropsListHeader> = ({
  guestList,
  setGuestList,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  loadGuests,
  baseUrl,
  setEventId,
  eventId,
}) => {
  async function addGuest() {
    const response = await fetch(`${baseUrl}/addNewGuestToEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: eventId,
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    const guestListTemp: IGuest[] = [...guestList, createdGuest];
    setGuestList(guestListTemp);
  }

  async function filter(filterid: string) {
    console.log('eventId: ', eventId);
    console.log('guestList: ', guestList);

    if (filterid === 'all') {
      setGuestList(await loadGuests(true, eventId));
    } else if (filterid === 'attending') {
      const onlyAttendingGuests = (await loadGuests(true, eventId)).filter(
        (element: IGuest) => {
          return element.attending;
        },
      );
      setGuestList(onlyAttendingGuests);
    } else if (filterid === 'notAttending') {
      const onlyAttendingGuests = (await loadGuests(true, eventId)).filter(
        (element: IGuest) => {
          return !element.attending;
        },
      );
      setGuestList(onlyAttendingGuests);
    }
  }

  return (
    <div css={ListHeaderStyles}>
      <div css={eventInfoStyles}>
        <p>Event: </p>
        <p>Location: </p>
      </div>
      <div css={addUserAndFilterStyles}>
        <div>
          <label htmlFor="firstName">
            <input
              type="text"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName">
            <input
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <button onClick={addGuest}>Add Guest</button>
        </div>
        <div>
          <p>Filters: </p>
          <fieldset id="radioFilters">
            <input
              type="radio"
              value="All"
              id="all"
              name="Filter"
              onChange={(e) => {
                filter(e.target.id);
              }}
            />
            <label htmlFor="all">All </label>

            <input
              type="radio"
              value="Attending"
              id="attending"
              name="Filter"
              onChange={(e) => {
                filter(e.target.id);
                e.target.checked = true;
              }}
            />
            <label htmlFor="attending">Attending </label>

            <input
              type="radio"
              value="Not attending"
              id="notAttending"
              name="Filter"
              onChange={(e) => {
                filter(e.target.id);
              }}
            />
            <label htmlFor="notAttending">Not attending </label>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default ListHeader;
