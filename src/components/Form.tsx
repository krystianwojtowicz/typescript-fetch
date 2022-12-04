import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import Input from "../atoms/Input";
import './styles/Form.scss';
// import { Data } from "../models/models";
// export interface Data {
//   data: string;
// }

interface RegisterFormData {
  password: string;
  login: string;
  email: string;
  phone: string;
  mark: boolean;
}

interface StarWarsPerson {
  vehicles: string[];
  created: string;
  name: string;
}

const initialValues: RegisterFormData = {
  login: "",
  password: "",
  email: "",
  phone: "",
  mark: false,
};

const initialErrors = {
  login: "",
  password: "",
  email: "",
  phone: "",
  mark: "",
};

interface RegisterFormErrors {
  password: string;
  login: string;
  email: string;
  phone: string;
  mark: string;
}

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState<RegisterFormData>(initialValues);
  const [formErrors, setFormErrors] =
    useState<RegisterFormErrors>(initialErrors);
  const [starWarsData, setStarWarsData] = useState<StarWarsPerson[]>([]);
  const [apiRequestCounter, setApiRequestCounter] = useState<number>(1);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChecbox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    setFormValues({ ...formValues, ['mark']: isChecked });
    console.log(formValues)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // setFormErrors(validate(formValues));
    console.log(formValues)
  };

  const saveData = () => {
    const hasNoErrors = Object.values(formErrors).every(
      (error) => error === ""
    );

    if (hasNoErrors && isSubmit) {
      fetch("https://example/", {
        method: "post",
        body: JSON.stringify({ ...formValues, starWarsData }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    console.log(formErrors)
    setIsSubmit(true);
    // saveData();
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      console.log(formErrors);
      fetch("https://example/", {
        method: "post",
        body: JSON.stringify({ ...formValues, starWarsData }),
        // body ok?
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  }, [formErrors]);

  const validate = (values: RegisterFormData) => {
    const errors: RegisterFormErrors = {...initialErrors};

    if (!values.login) {
      errors.login = "musisz wpisać login";
    }else errors.login = ""
    if (!values.password) {
      errors.password = "musisz wpisać hasło";
    }
    if (!values.email) {
      errors.email = "musisz wpisać email";
    } else if (!values.email.match(/.+@.+/)) {
      const hasAtSign = values.email.includes("@"); // sprawdzenie czy zawiera "małpę"
      errors.email = "Nieprawidłowy format adresu e-mail";
    }else errors.login = ""
    if (!values.phone) {
      errors.phone = "musisz wpisać numer telefonu";
    // } else if (values.phone.length !== 9 && (!/^[0-9]+$/.test(values.phone))) {
    } else if (!/^\d{9}$/.test(values.phone)) {
    // } else if (!/^[0-9]+$/.test(values.phone)) {
      errors.phone = "Nieprawidłowy numer telefonu";
    }
    if (values.mark===false) {
      errors.mark = "Wymagana akceptacja regulaminu";
    }
    return errors;
  };

  // const getData = useCallback(async () => {
  //   const res = await fetch(
  //     `https://swapi.py4e.com/api/people/${apiRequestCounter}`
  //   );
  //   const data = await res.json();
  // console.log(data)
  //   setStarWarsData([
  //     { name: data.name, created: data.created, vehicles: data.vehicles },
  //   ]);
  //   setApiRequestCounter(apiRequestCounter + 1);
  // }, [apiRequestCounter]);
  const getData = async () => {
    const res = await fetch(
      `https://swapi.py4e.com/api/people/${apiRequestCounter}`
    );
    const data = await res.json();
    console.log(data)
    setStarWarsData([
      { name: data.name, created: data.created, vehicles: data.vehicles },
    ]);
    setApiRequestCounter(apiRequestCounter + 1);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    getData();
  };

  return (
    <>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <button className="next-profiles" onClick={handleClick}>
        <span className="inner-next-profiles">next profiles</span>
      </button>
      <div className="form">
        <h1 className='h1form'>formularz rejestracyjny</h1>
        <hr className="under-h1" />
          <form onSubmit={handleSubmit} className="inner-form">
          {/* <form> */}
          <Input value={formValues.login}
                  onChange={handleChange} error={formErrors.login} name="login" type="text" label="Login:"> 
          </Input>
          <Input value={formValues.password}
                  onChange={handleChange} error={formErrors.password} name="password" type="text" label="Hasło:"> 
          </Input>
          <Input value={formValues.email}
                  onChange={handleChange} error={formErrors.email} name="email:" type="text" label="Email:"> 
          </Input>
          <Input value={formValues.phone}
                  onChange={handleChange} error={formErrors.phone} name="phone" type="text" label="Numer Telefonu:"> 
          </Input>
          {/* <div className="wrapper-field">
          <div className="field">
                <label>Login:</label>
                <input
                className="input"
                  type="text"
                  name="login"
                  value={formValues.login}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.login}</p>
              <hr />
          </div> */}
          {/* <div className="wrapper-field">
          <div className="field">
                <label>Hasło:</label>
                <input
                className="input"
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.password}</p>
              <hr />
              </div>
              <div className="wrapper-field">
              <div className="field">
                <label>Email:</label>
                <input
                className="input"
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.email}</p>
              <hr />
              </div>
              <div className="wrapper-field">
              <div className="field">
                <label>Numer Telefonu:</label>
                <input
                className="input"
                  type="text"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.phone}</p>
              <hr />
              </div> */}
              <div className="wrapper-field">
              <div className="field checkbox">
                
                <input
                className="input"
                  type="checkbox"
                  name="mark"
                  checked={isChecked}
                  onChange={handleChecbox}
                />
                <label>Akceptuję Regulamin</label>
                <p>{formErrors.mark}</p>
              </div>
              
              </div>
              <button className='submit'
              // onSubmit={handleSubmit} 
              type="submit">
                
                <span className="inner-submit">zapisz</span>
              </button>
          </form>
      </div>
    </>
  );
};

export default Form;




// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   ChangeEvent,
//   FormEvent,
// } from "react";
// import Input from "../atoms/Input";
// import './styles/Form.scss';
// // import { Data } from "../models/models";
// // export interface Data {
// //   data: string;
// // }

// interface RegisterFormData {
//   password: string;
//   login: string;
//   email: string;
//   phone: string;
//   mark: boolean;
// }

// interface StarWarsPerson {
//   vehicles: string[];
//   created: string;
//   name: string;
// }

// const initialValues: RegisterFormData = {
//   login: "",
//   password: "",
//   email: "",
//   phone: "",
//   mark: false,
// };

// const initialErrors = {
//   login: "",
//   password: "",
//   email: "",
//   phone: "",
//   mark: "",
// };

// interface RegisterFormErrors {
//   password: string;
//   login: string;
//   email: string;
//   phone: string;
//   mark: string;
// }

// const Form: React.FC = () => {
//   const [formValues, setFormValues] = useState<RegisterFormData>(initialValues);
//   const [formErrors, setFormErrors] =
//     useState<RegisterFormErrors>(initialErrors);
//   const [starWarsData, setStarWarsData] = useState<StarWarsPerson[]>([]);
//   const [apiRequestCounter, setApiRequestCounter] = useState<number>(1);
//   const [isSubmit, setIsSubmit] = useState<boolean>(false);
//   const [isChecked, setIsChecked] = useState<boolean>(false);

//   const handleChecbox = (e: ChangeEvent<HTMLInputElement>) => {
//     setIsChecked(!isChecked);
//     setFormValues({ ...formValues, ['mark']: isChecked });
//     console.log(formValues)
//   }
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//     setFormErrors(validate(formValues));
//     console.log(formValues)
//   };

//   const saveData = () => {
//     const hasNoErrors = Object.values(formErrors).every(
//       (error) => error === ""
//     );

//     if (hasNoErrors && isSubmit) {
//       fetch("https://example/", {
//         method: "post",
//         body: JSON.stringify({ ...formValues, starWarsData }),
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((err) => console.log(err));
//     }
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setFormErrors(validate(formValues));
//     console.log(formErrors)
//     setIsSubmit(true);
//     // saveData();
//   };

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//       console.log(formErrors);
//       fetch("https://example/", {
//         method: "post",
//         body: JSON.stringify({ ...formValues, starWarsData }),
//         // body ok?
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((err) => console.log(err));
//     }
//   }, [formErrors]);

//   const validate = (values: RegisterFormData) => {
//     const errors: RegisterFormErrors = {...initialErrors};

//     if (!values.login) {
//       errors.login = "musisz wpisać login";
//     }else errors.login = ""
//     if (!values.password) {
//       errors.password = "musisz wpisać hasło";
//     }
//     if (!values.email) {
//       errors.email = "musisz wpisać email";
//     } else if (!values.email.match(/.+@.+/)) {
//       const hasAtSign = values.email.includes("@"); // sprawdzenie czy zawiera "małpę"
//       errors.email = "Nieprawidłowy format adresu e-mail";
//     }else errors.login = ""
//     if (!values.phone) {
//       errors.phone = "musisz wpisać numer telefonu";
//     // } else if (values.phone.length !== 9 && (!/^[0-9]+$/.test(values.phone))) {
//     } else if (!/^\d{9}$/.test(values.phone)) {
//     // } else if (!/^[0-9]+$/.test(values.phone)) {
//       errors.phone = "Nieprawidłowy numer telefonu";
//     }
//     if (values.mark===false) {
//       errors.mark = "musisz zatwierdzić regulamin";
//     }
//     return errors;
//   };

//   // const getData = useCallback(async () => {
//   //   const res = await fetch(
//   //     `https://swapi.py4e.com/api/people/${apiRequestCounter}`
//   //   );
//   //   const data = await res.json();
//   // console.log(data)
//   //   setStarWarsData([
//   //     { name: data.name, created: data.created, vehicles: data.vehicles },
//   //   ]);
//   //   setApiRequestCounter(apiRequestCounter + 1);
//   // }, [apiRequestCounter]);
//   const getData = async () => {
//     const res = await fetch(
//       `https://swapi.py4e.com/api/people/${apiRequestCounter}`
//     );
//     const data = await res.json();
//     console.log(data)
//     setStarWarsData([
//       { name: data.name, created: data.created, vehicles: data.vehicles },
//     ]);
//     setApiRequestCounter(apiRequestCounter + 1);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleClick = () => {
//     getData();
//   };

//   return (
//     <>
//       <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
//       <button className="next-profiles" onClick={handleClick}>
//         <span className="inner-next-profiles">next profiles</span>
//       </button>
//       <div className="form">
//         <h1 className='h1form'>formularz rejestracyjny</h1>
//         <hr className="under-h1" />
//           <form onSubmit={handleSubmit} className="inner-form">
//           {/* <form> */}
//           <div className="field">
//                 <label>Login:</label>
//                 <input
//                 className="input"
//                   type="text"
//                   name="login"
//                   value={formValues.login}
//                   onChange={handleChange}
//                 />
//               </div>
//               {formErrors.login}
//               <hr />
//           <div className="field">
//                 <label>Hasło:</label>
//                 <input
//                 className="input"
//                   type="text"
//                   name="password"
//                   value={formValues.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               {formErrors.password}
//               <hr />
//               <div className="field">
//                 <label>Email:</label>
//                 <input
//                 className="input"
//                   type="text"
//                   name="email"
//                   value={formValues.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               {formErrors.email}
//               <hr />
//               <div className="field">
//                 <label>Numer Telefonu:</label>
//                 <input
//                 className="input"
//                   type="text"
//                   name="phone"
//                   value={formValues.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               {formErrors.phone}
//               <hr />
//               <div className="field checkbox">
                
//                 <input
//                 className="input"
//                   type="checkbox"
//                   name="mark"
//                   checked={isChecked}
//                   onChange={handleChecbox}
//                 />
//                 <label>Akceptuję Regulamin</label>
//               </div>
//               {formErrors.mark}
//               {/* <Input
//               type="text"
//                 value={formValues.login}
//                 error={formErrors.login}
//                 onChange={handleChange}
//                 label="Login:"
//                 name="login"
//               />
//               <Input
//               type="text"
//                 value={formValues.password}
//                 error={formErrors.password}
//                 onChange={handleChange}
//                 label="Hasło:"
//                 name="password"
//               />
//               <Input
//               type="text"
//                 value={formValues.email}
//                 error={formErrors.email}
//                 onChange={handleChange}
//                 label="Email:"
//                 name="email"
//               />
//               <Input
//               type="text"
//                 value={formValues.phone}
//                 error={formErrors.phone}
//                 onChange={handleChange}
//                 label="Numer Telefonu:"
//                 name="phone"
//               />
//               <Input
//               type="checbox"
//                 checked={formValues.mark}
//                 error={formErrors.mark}
//                 onChange={handleChange}
//                 label="Akceptuję Regulamin"
//                 name="mark"
//               /> */}
//               {/* <div className="field">
//                 <label>Hasło:</label>
//                 <input
//                   type="text"
//                   name="password"
//                   value={formValues.password}
//                   onChange={handleChange}
//                 />
//               </div> */}
//               {/* <div className="field">
//                 <label>Email:</label>
//                 <input
//                   type="text"
//                   name="email"
//                   value={formValues.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <p>{formErrors.email}</p>
//               <div className="field">
//                 <label>Numer Telefonu:</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formValues.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>Regulamin:</label>
//                 <input
//                   type="checkbox"
//                   name="mark"
//                   checked={formValues.mark}
//                   onChange={handleChange}
//                 />
//               </div> */}
//               <button className='submit'
//               // onSubmit={handleSubmit} 
//               type="submit">
                
//                 <span className="inner-submit">zapisz</span>
//               </button>
//           </form>
//       </div>
//     </>
//   );
// };

// export default Form;

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
