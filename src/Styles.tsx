/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const appStyles = css`
  display: grid;
  height: 100%;
  background-color: none;
  margin: 30px;
  grid-template-columns: 2fr 7fr;
  grid-template-rows: 1fr 7fr;

  button {
    font-size: 16px;
    margin: 5px;
    border: none;
    background-color: transparent;
    color: black;
    padding: 5px 15px;
    letter-spacing: 2px;
    border-radius: 5px;
    font-weight: normal;
    box-shadow: 2px 2px 5px;
    outline: none;

    :hover {
      background-color: rgba(10, 1, 12, 0.1);
      /* color: #fff; */
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    :active {
      box-shadow: none;
    }
  }

  input {
    width: 80%;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
  }
`;

export const sidebarStyles = css`
  grid-column: 1/2;
  grid-row: 1/9;
  background-color: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .SideBarHeader {
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 50px;
  }

  .SideBarNewEvents {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 80px;

    p {
      color: red;
    }
  }

  .SideBarExistingEvents {
    max-height: 50vh;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;

    ul {
      list-style: none;
      padding: none;
      padding-inline-start: 0px;
      width: 80%;
      margin: auto;

      li {
        width: 100%;
        text-align: center;
        display: flex;
      }
    }

    button {
      width: 80%;
      word-break: break-word;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .deleteEvent {
      width: 10%;
      padding: 2px;
      display: flex;
      justify-content: center;
    }

    .deleteEventImg {
      pointer-events: none;
    }
  }
`;

export const eventAreaStyles = css`
  grid-column: 2/9;
  grid-row: 1/7;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 14em 5fr;
  background-color: none;
`;

export const listHeaderStyles = css`
  grid-column: 1;
  grid-row: 1/2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: none;
  background-color: none;
  max-height: 14em;
  padding: 30px;

  .EventInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 30px;
    margin-left: 30px;

    strong {
      display: inline;
    }
  }

  .AddGuest {
    color: red;
  }

  .FilterGuests {
    margin-right: 10%;

    fieldset {
      font-size: 20px;
      display: flex;
      flex-direction: column;
      width: 10vw;
      border: none;
    }

    input {
      width: 10%;
      margin: 5px;
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
    }
  }
`;

export const listStyles = css`
  grid-column: 1;
  grid-row: 2/7;
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  button {
    margin-bottom: 40px;
  }

  table {
    tr {
      button {
        display: inline-flex;
      }
    }

    th {
      width: 12vw;
    }
  }
`;

export const emptyEventAreaStyles = css`
  margin: 3%;
  grid-column: 1;
  grid-row: 1/7;
  border: 1px solid black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;
