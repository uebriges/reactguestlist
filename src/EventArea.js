/** @jsxImportSource @emotion/react */
// ListHeader
// List
import { useState } from 'react';
import List from './List';
import ListHeader from './ListHeader';
import { EventAreaStyles } from './Styles';

export default function EventArea() {
  const [guestList, setGuestList] = useState([]);

  return (
    <div>
      <div css={EventAreaStyles}>
        <ListHeader guestList={guestList} setGuestList={setGuestList} />
        <List guestList={guestList} setGuestList={setGuestList} />
      </div>
    </div>
  );
}
