import './App.scss';
import { useState } from "react";
import Photo from './components/Photo';
import Form from './components/Form';
// import {FormValues} from './models/model'

const App: React.FC = () => {
  // const initialValues = {
  //   login: "",
  //   password: "",
  //   email: "",
  //   phone: "",
  //   mark: false,
  // };
  // const [formValues, setFormValues] = useState<{login: string,
  //   password: string,
  //   email: string,
  //   phone: string,
  //   mark: boolean}>(initialValues);

  return (
    <div className="wrapper">
      <Photo></Photo>
      {/* <Form formValues={formValues} setFormValues={setFormValues}></Form> */}
      <Form></Form>
    </div>
  );
}

export default App;
