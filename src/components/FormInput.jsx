const FormInput = (props) => {
  return (
    <>
      <div className="field">
        <label>{props.input}</label>
        <input
          type="text"
          name="password"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <p>{props.error}</p>
    </>
  );
};

export default FormInput;

// const FormInput = (props) => {
//   return (
//     <>
//       <div className="field">
//         <label>Hasło:</label>
//         <input
//           type="text"
//           name="password"
//           value={props.value}
//           onChange={props.onChange}
//         />
//       </div>
//       <p>{props.error}</p>
//     </>
//   );
// };

// export default FormInput;
