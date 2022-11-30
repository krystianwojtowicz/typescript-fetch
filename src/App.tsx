import {useState, useEffect }  from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
   ( async () => {
    const res = await fetch('https://swapi.dev/api/people/1');
    const data = await res.json();
    console.log(data);
  })()
  }, [])
  
  return (
    <div className="App">
      ssss
    </div>
  );
}

export default App;
