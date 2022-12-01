import './App.scss';
import Photo from './components/Photo';
import Form from './components/Form';

const App: React.FC = () => {
  

  return (
    <div className="wrapper">
      <Photo></Photo>
      <Form></Form>
    </div>
  );
}

export default App;
