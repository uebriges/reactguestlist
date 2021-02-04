/** @jsxImportSource @emotion/react */
import './App.css';
import EventArea from './EventArea';
import Sidebar from './Sidebar';
import { AppStyles } from './Styles';

function App() {
  return (
    <div className="App" css={AppStyles}>
      <Sidebar />
      <EventArea />
    </div>
  );
}

export default App;
