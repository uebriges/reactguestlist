/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import deleteLogo from './delete-button.svg';
import { listStyles } from './Styles';
// List
// - Edit first and last name
// - Delete guest
// - Set to attending
// - Set attending deadline
// Delete all attending guests button
interface IGuest {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  deadline: string;
}

interface IPropsList {
  guestList: IGuest[];
  setGuestList: (guestList: IGuest[]) => void;
  baseUrl: string;
}

const List: React.FC<IPropsList> = ({ guestList, setGuestList, baseUrl }) => {
  const [readOnly, setReadOnly] = useState<boolean>(true);

  async function deleteAllGuests() {
    if (guestList.length > 0) {
      const eventId = guestList[0].id.split('-')[0];
      const response = await fetch(
        `${baseUrl}/deleteAttendingEventGuests/${eventId}`,
        {
          method: 'DELETE',
        },
      );
      await response.json();
      setGuestList(
        guestList.filter((element) => {
          return !element.attending;
        }),
      );
    }
  }

  async function deleteSingleGuest(id: string) {
    await fetch(`${baseUrl}/eventGuest/${id}`, {
      method: 'DELETE',
    });
    const filtered = guestList.filter((element) => {
      return !(element.id === id);
    });

    console.log('deleteSingle - filtered: ', filtered);
    setGuestList(filtered);
  }

  async function updateGuest(
    value: string,
    guestObject: IGuest,
    property: string,
  ) {
    const response = await fetch(`${baseUrl}/ModifyEG/${guestObject.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [property]: value,
      }),
    });
    const updatedGuest = await response.json();
    // needed for the check property to properly update
    updatedGuest.attending === 'true'
      ? (updatedGuest.attending = true)
      : (updatedGuest.attending = false);

    console.log('updatedGuest: ', updatedGuest);

    const updatedGuestList = guestList.map((element) => {
      if (element.id === updatedGuest.id) {
        return updatedGuest;
      } else {
        return element;
      }
    });
    console.log('updatedGuestList: ', updatedGuestList);
    setGuestList(updatedGuestList);
  }

  return (
    <div css={listStyles}>
      <div>
        <button onClick={deleteAllGuests}>Wipe all attending guests</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Attending</th>
              <th>Delete</th>
              <th>Attending deadline</th>
            </tr>
          </thead>
          <tbody>
            {guestList.map((element) => {
              return (
                <tr id={element.id} key={element.id + 'key'}>
                  <th>{element.id}</th>
                  <th>
                    <input
                      id={'firstName' + element.id}
                      readOnly={readOnly}
                      defaultValue={element.firstName}
                      onChange={(e) => {
                        updateGuest(e.target.value, element, 'firstName');
                      }}
                      onDoubleClick={(
                        e: React.MouseEvent<HTMLInputElement>,
                      ) => {
                        (e.target as HTMLInputElement).readOnly = false;
                        setReadOnly(true);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).readOnly = true;
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
                      onChange={(e) => {
                        updateGuest(e.target.value, element, 'lastName');
                      }}
                      onDoubleClick={(
                        e: React.MouseEvent<HTMLInputElement, MouseEvent>,
                      ) => {
                        (e.target as HTMLInputElement).readOnly = false;
                        setReadOnly(true);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).readOnly = true;
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
                        updateGuest(
                          e.target.checked.toString(),
                          element,
                          'attending',
                        );
                      }}
                    />
                  </th>
                  <th>
                    <button onClick={() => deleteSingleGuest(element.id)}>
                      <img
                        src={deleteLogo}
                        alt="Delete single guest"
                        height="15px"
                      />
                    </button>
                  </th>
                  <th>
                    <input
                      id={'attendingDeadline' + element.id}
                      readOnly={readOnly}
                      defaultValue={element.deadline}
                      type="text"
                      onDoubleClick={(e) => {
                        (e.target as HTMLInputElement).readOnly = false;
                        setReadOnly(true);
                        (e.target as HTMLInputElement).type = 'date';
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).type = 'text';
                          (e.target as HTMLInputElement).readOnly = true;
                          setReadOnly(true);
                          const today = new Date();
                          const enteredDate = new Date(
                            Number(
                              (e.target as HTMLInputElement).value.slice(0, 4),
                            ),
                            Number(
                              (e.target as HTMLInputElement).value.slice(5, 7),
                            ) - 1,
                            Number(
                              (e.target as HTMLInputElement).value.slice(8, 10),
                            ),
                          );
                          if (enteredDate >= today) {
                            updateGuest(
                              (e.target as HTMLInputElement).value.toString(),
                              element,
                              'deadline',
                            );
                            updateGuest('true', element, 'attending');
                          } else {
                            (e.target as HTMLInputElement).value = '';
                            updateGuest('', element, 'deadline');
                            updateGuest('false', element, 'attending');
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
    </div>
  );
};

export default List;
