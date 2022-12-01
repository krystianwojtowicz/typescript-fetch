import React, { useState, useEffect } from "react";
// import { Data } from "../models/models";
// export interface Data {
//   data: string;
// }

const Form: React.FC<Data> = () => {
  // const Form = () => {
  // const [data, setData] = useState < Data > "";
  const [data, setData] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      <button onClick={handleClick}>
        <span>next profiles</span>
      </button>
      <div className="form">
        <h1>formularz rejestracyjny</h1>
        <hr className="under-h1" />
        <div className="inner-form">
          <div className="form-data">
            <label>Login:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />

            <hr />

            <span>Hasło:</span>

            <hr />
            <span>Email:</span>
            <input type="text" />
            <hr />
            <span>Numer Telefonu:</span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <hr />
          </div>
          <label className="checkbox">
            <input type="checkbox" />
            <span>Akceptuję Regulamin</span>
          </label>
        </div>
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
