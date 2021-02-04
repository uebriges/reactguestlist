/** @jsxImportSource @emotion/react */
// ListHeader
// List
import List from './List';
import ListHeader from './ListHeader';
import { EventAreaStyles } from './Styles';

export default function EventArea() {
  return (
    <div>
      <div css={EventAreaStyles}>
        <ListHeader />
        <List />
      </div>
    </div>
  );
}
