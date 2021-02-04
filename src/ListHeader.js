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

export default function ListHeader() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);

  const baseUrl = 'http://localhost:5000';

  async function addUser() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
  }

  function filter() {}

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
          <button onClick={addUser}>Add Guest</button>
        </div>
        <div>
          <p>Filters: </p>
          <fieldset id="radioFilters">
            <label htmlFor="all">All </label>
            <input type="radio" value="All" id="all" name="Filter" />

            <label htmlFor="attending">Attending </label>
            <input
              type="radio"
              value="Attending"
              id="attending"
              name="Filter"
            />

            <label htmlFor="notAttending">Not attending </label>
            <input
              type="radio"
              value="Not attending"
              id="notAttending"
              name="Filter"
            />
          </fieldset>
        </div>
      </div>
    </div>
  );
}
