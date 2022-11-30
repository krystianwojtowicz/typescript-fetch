function Photo() {
  return (
    <>
      <header>
        <div className="name">
          {/* Krystian Wójtowicz */}
          imie i nazwisko osoby wykonujacej zadanie
        </div>
        <div className="form-text">
          <div className="text">formularz rejestracyjny</div>
        </div>
      </header>
      <div className="picture">
        <div className="inner-picture"></div>
        <h1>Name</h1>
        <i className="fa-solid fa-circle-check"></i>
        <div className="look">
          <span>age:</span>
          <span>eye color:</span>
        </div>
        {/* <img src="s.jpg" alt=""> */}
      </div>
      <button>
        <span>next profiles</span>
      </button>
    </>
  );
}

export default Photo;
