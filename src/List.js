/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';

// List
// - Edit first and last name
// - Delete guest
// - Attending deadline
// Delete all guest button

export default function List(props) {
  const [editable, setEditable] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [attending, setAttending] = useState();
  const [attendingDeadline, setAttendingDeadline] = useState();

  async function deleteAllGuests() {
    console.log('Guest list: ', props.guestList);
    let response;
    props.guestList.map(async (element, id) => {
      response = await fetch(`${props.baseUrl}/${element.id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
    });
    props.setGuestList([]);
  }

  async function deleteSingleGuest(id) {
    const filtered = await props.guestList.filter(async (value) => {
      if (value.id === id) {
        const response = await fetch(`${props.baseUrl}/${value.id}`, {
          method: 'DELETE',
        });
        const deletedGuest = await response.json();
        console.log('deleted guest: ', deletedGuest);
        return false;
      }
      console.log('value.id', value.id);
      console.log('id: ', id);
      console.log('!(value.id === id)', !(value.id === id));
      return true;
    });
    console.log('filtered: ', filtered);
    props.setGuestList(filtered);
  }

  async function updateGuest(value, element, property) {
    console.log(value);
    console.log(element);
    const response = await fetch(`${props.baseUrl}/${element.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [property]: value }),
    });
    const updatedGuest = await response.json();
    const updatedGuestList = props.guestList.map((element) => {
      if (element.id === updatedGuest.id) {
        return updatedGuest;
      } else {
        return element;
      }
    });
    props.setGuestList(updatedGuestList);
  }

  useEffect(() => {
    props.loadGuests();
  }, []);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Attending</th>
              <th>Delete</th>
              <th>Attending deadline</th>
            </tr>
          </thead>
          <tbody>
            {props.guestList.map((element, id) => {
              return (
                <tr id={element.id} key={element.id + 'key'}>
                  <th>
                    <input
                      id={'firstName' + element.id}
                      readOnly={readOnly}
                      defaultValue={element.firstName}
                      onChange={(e) => props.setFirstName(e.target.value)}
                      onDoubleClick={(e) => {
                        e.target.readOnly = false;
                        setReadOnly(true);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.target.readOnly = true;
                          setReadOnly(true);
                        }
                      }}
                    />
                  </th>
                  <th>
                    <input
                      id={'lastName' + element.id}
                      readOnly={readOnly}
                      defaultValue={element.lastName}
                      onChange={(e) => props.setLastName(e.target.value)}
                      onDoubleClick={(e) => {
                        e.target.readOnly = false;
                        setReadOnly(true);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.target.readOnly = true;
                          setReadOnly(true);
                        }
                      }}
                    />
                  </th>
                  <th>
                    <input
                      id={'attending' + element.id}
                      type="checkbox"
                      checked={element.attending}
                      onChange={(e) => {
                        updateGuest(e.target.checked, element, 'attending');
                        setAttending(e.target.checked);
                      }}
                    />
                  </th>
                  <th>
                    <button onClick={(e) => deleteSingleGuest(element.id)}>
                      Delete
                    </button>
                  </th>
                  <th>
                    {' '}
                    <input
                      id={'attendingDeadline' + element.id}
                      readOnly={readOnly}
                      defaultValue=""
                      type="text"
                      onChange={(e) => setAttendingDeadline(e.target.value)}
                      onDoubleClick={(e) => {
                        e.target.readOnly = false;
                        setReadOnly(true);
                        e.target.type = 'date';
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.target.readOnly = true;
                          setReadOnly(true);
                          const today = new Date();
                          const enteredDate = new Date(
                            e.target.value.slice(0, 4),
                            Number(e.target.value.slice(5, 7)) - 1,
                            Number(e.target.value.slice(8, 10)),
                          );
                          if (enteredDate >= today) {
                            // Change checked to
                            //updateGuest(true, element, 'attendingDate');
                          }
                        }
                      }}
                    />
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={deleteAllGuests}>Wipe guest list</button>
      </div>
    </div>
  );
}
