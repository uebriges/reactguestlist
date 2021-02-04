/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';

// List
// - Edit first and last name
// - Delete guest
// - Attending deadline
// Delete all guest button

export default function List(props) {
  //const [guestList, setGuestList] = useState([]);
  const baseUrl = 'http://localhost:5000';

  async function loadGuests() {
    const response = await fetch(`${baseUrl}/`);
    const allGuests = await response.json();
    console.log('in load guests: ', allGuests);
    props.setGuestList(allGuests);
  }

  async function deleteAllGuests() {
    console.log('Guest list: ', props.guestList);
    let response;
    props.guestList.map(async (element, id) => {
      response = await fetch(`${baseUrl}/${element.id}`, { method: 'DELETE' });
      const deletedGuest = await response.json();
    });
    props.setGuestList([]);
  }

  useEffect(() => {
    loadGuests();
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
                <tr key={element.id}>
                  <th>{element.firstName}</th>
                  <th>{element.lastName}</th>
                  <th>{element.attending}</th>
                  <th></th>
                  <th></th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={deleteAllGuests}>Delete all users</button>
      </div>
    </div>
  );
}
