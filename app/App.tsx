import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleClickPlay = () => {
    window.open(
      'http://localhost:5174/',
      undefined,
      'popup,width=840,height=700'
    );
  };

  return (
    <>
      <button onClick={handleClickPlay}>Play</button>
    </>
  );
}

export default App;
