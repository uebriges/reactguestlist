/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const AppStyles = css`
  display: grid;
  border: 1px solid;
  grid-template-columns: 1fr 5fr;
  height: 100vh;
  background-color: red;
  margin: 0px;
  grid-template-areas:
    'Sidebar Header'
    'Sidebar List'
    'Sidebar List'
    'Sidebar List'
    'Sidebar List'
    'Sidebar List';
`;

export const SidebarStyles = css`
  grid-area: Sidebar;
  border: 1px solid;
  background-color: green;
`;

export const EventAreaStyles = css`
  grid-column: 2 / span 5;
  grid-template-rows: 1fr 5fr;
  border: 1px solid;
  height: 100%;
  background-color: yellow;
`;

export const ListHeaderStyles = css`
  grid-area: Header;
  border: 1px solid;
  display: float;
  background-color: gray;
`;

export const ListStyles = css`
  grid-area: List;
  border: 1px solid;
  background-color: darkblue;
`;

export const addUserAndFilterStyles = css`
  justify-content: flex-end;
`;

export const eventInfoStyles = css`
  justify-content: flex-end;
`;
