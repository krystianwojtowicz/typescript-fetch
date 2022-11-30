import {useState, useEffect }  from 'react';
import './App.scss';
import Photo from './components/Photo';
import Form from './components/Form';

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
    <div className="wrapper">
      <Photo></Photo>
      <Form></Form>
    </div>
  );
}

export default App;
