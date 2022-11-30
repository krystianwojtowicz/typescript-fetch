function Form() {
  return (
    <div className="form">
      <h1>formularz rejestracyjny</h1>
      <hr className="under-h1" />
      <div className="inner-form">
        <span>Login:</span>
        <hr />
        <span>Hasło:</span>
        <hr />
        <span>Email:</span>
        <hr />
        <span>Numer Telefonu:</span>
        <hr />
        <label>
          <input type="checkbox" />
          <span>Akceptuję Regulamin</span>
        </label>
      </div>
    </div>
  );
}

export default Form;
