/** @jsxImportSource @emotion/react */
// Show Event name + Location
// Add new guest
// Filter
import React, { useState } from 'react';
import { listHeaderStyles } from './Styles';

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
  loadGuests: (shouldReturn: boolean, id: number) => any;
  baseUrl: string;
  eventId: number;
  currentEventLocation: string;
  currentEventName: string;
}

const ListHeader: React.FC<IPropsListHeader> = ({
  guestList,
  setGuestList,
  loadGuests,
  baseUrl,
  eventId,
  currentEventLocation,
  currentEventName,
}) => {
  const [newGuestFirstName, setNewGuestFirstName] = useState('');
  const [newGuestLastName, setNewGuestLastName] = useState('');
  const [missingFirstOrLastNameErr, setMissingFirstOrLastNameErr] = useState(
    '',
  );

  async function addGuest() {
    if (newGuestFirstName && newGuestLastName) {
      const response = await fetch(`${baseUrl}/addNewGuestToEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          firstName: newGuestFirstName,
          lastName: newGuestLastName,
        }),
      });
      const createdGuest = await response.json();
      createdGuest.attending = createdGuest.attending === 'true' ? true : false;
      console.log('createdGuest: ', createdGuest);
      const guestListTemp: IGuest[] = [...guestList, createdGuest];
      setGuestList(guestListTemp);
      setMissingFirstOrLastNameErr('');
      setNewGuestFirstName('');
      setNewGuestLastName('');
    } else {
      if (!newGuestFirstName) {
        setMissingFirstOrLastNameErr('First name is not given.');
      } else if (!newGuestLastName) {
        setMissingFirstOrLastNameErr('Last name is not given.');
      }
    }
  }

  async function filter(filterid: string) {
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
    <div css={listHeaderStyles}>
      <div className="EventInfo">
        <strong>Event: </strong>
        {currentEventName}
        <br />
        <strong>Location: </strong>
        {currentEventLocation}
      </div>
      <div className="AddGuest">
        <input
          type="text"
          placeholder="First name"
          id="firstName"
          value={newGuestFirstName}
          onChange={(e) => setNewGuestFirstName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              (document.getElementById(
                'addGuestBtn',
              ) as HTMLButtonElement).click();
            }
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Last name"
          id="lastName"
          value={newGuestLastName}
          onChange={(e) => setNewGuestLastName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              (document.getElementById(
                'addGuestBtn',
              ) as HTMLButtonElement).click();
            }
          }}
        />
        <br />
        <button onClick={addGuest} id="addGuestBtn">
          Add Guest
        </button>
        <p>{missingFirstOrLastNameErr}</p>
      </div>
      <div className="FilterGuests">
        <fieldset id="radioFilters">
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default ListHeader;
