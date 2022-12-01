import React, { useState, useEffect } from "react";
// import { Data } from "../models/models";
// export interface Data {
//   data: string;
// }

const Form: React.FC<Data> = () => {
  const initialValues = { login: "", password: "", email: "", phone: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    // validate(formValues);
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.login) {
      errors.login = "musisz wpisać login";
    }
    if (!values.password) {
      errors.password = "musisz wpisać hasło";
    }
    if (!values.email) {
      errors.email = "musisz wpisać email";
    } else if (!values.email.match(/.+@.+/)) {
      // } else if (!values.email.match(/.@./)) {
      errors.email = "Nieprawidłowy format adresu e-mail";
    }
    if (!values.phone) {
      errors.phone = "musisz wpisać numer telefonu";
    } else if (values.phone.length !== 9) {
      errors.phone = "Nieprawidłowy numer telefonu";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  let counter: number = 1;
  const getData = async () => {
    const res = await fetch(`https://swapi.dev/api/people/${counter}`);
    const data = await res.json();
    console.log(data);
    counter++;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    getData();
    // setData(4);
  };
  return (
    <>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <button onClick={handleClick}>
        <span>next profiles</span>
      </button>
      <div className="form">
        <h1>formularz rejestracyjny</h1>
        <hr className="under-h1" />s
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>Login:</label>
                <input
                  type="text"
                  name="login"
                  value={formValues.login}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.login}</p>
              <div className="field">
                <label>Hasło:</label>
                <input
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Numer Telefonu:</label>
                <input
                  type="text"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <button className="fluid ui button blue">Submit</button>
            </div>
          </form>
        </div>
        s
      </div>
    </>
  );
};

export default Form;

// import React, { useState, useEffect } from "react";
// // import { Data } from "../models/models";
// // export interface Data {
// //   data: string;
// // }

// const Form: React.FC<Data> = () => {
//   // const Form = () => {
//   // const [data, setData] = useState < Data > "";
//   const [data, setData] = useState(null);
//   let counter: number = 1;
//   const getData = async () => {
//     const res = await fetch(`https://swapi.dev/api/people/${counter}`);
//     const data = await res.json();
//     console.log(data);
//     counter++;
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleClick = () => {
//     getData();
//     // setData(4);
//   };
//   return (
//     <>
//       <button onClick={handleClick}>
//         <span>next profiles</span>
//       </button>
//       <div className="form">
//         <h1>formularz rejestracyjny</h1>
//         <hr className="under-h1" />
//         <div className="inner-form">
//           <div>
//             <span>Login:</span>
//             <input type="text" />
//           </div>

//           <hr />
//           <span>Hasło:</span>

//           <hr />
//           <span>Email:</span>
//           <input type="text" />
//           <hr />
//           <span>Numer Telefonu:</span>
//           <input type="text" />
//           <hr />
//           <label>
//             <input type="checkbox" />
//             <span>Akceptuję Regulamin</span>
//           </label>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Form;
