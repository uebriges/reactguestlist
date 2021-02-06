/** @jsxImportSource @emotion/react */
// Show Event name + Location
// Add new guest
// Filter

import React, { useState } from 'react';
import {
  addUserAndFilterStyles,
  eventInfoStyles,
  ListHeaderStyles,
} from './Styles';

export default function ListHeader(props) {
  const [checkedId, setCheckedId] = useState('all');

  async function addGuest() {
    const response = await fetch(`${props.baseUrl}/addNewGuestToEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: props.eventId,
        firstName: props.firstName,
        lastName: props.lastName,
      }),
    });
    const createdGuest = await response.json();
    const guestListTemp = [...props.guestList, createdGuest];
    props.setGuestList(guestListTemp);
  }

  async function filter(filterid) {
    if (filterid === 'all') {
      props.setGuestList(await props.loadGuests(true));
    } else if (filterid === 'attending') {
      const onlyAttendingGuests = (await props.loadGuests(true)).filter(
        (element) => {
          return element.attending;
        },
      );
      props.setGuestList(onlyAttendingGuests);
    } else if (filterid === 'notAttending') {
      const onlyAttendingGuests = (await props.loadGuests(true)).filter(
        (element) => {
          return !element.attending;
        },
      );
      props.setGuestList(onlyAttendingGuests);
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
              onChange={(e) => props.setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName">
            <input
              type="text"
              id="lastName"
              onChange={(e) => props.setLastName(e.target.value)}
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
}
