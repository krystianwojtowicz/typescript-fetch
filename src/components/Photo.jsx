import { useState, useEffect } from "react";

function Photo() {
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://picsum.photos/534/383`);
      // const data = await response.json()
      // console.log(data)

      // const data = await response.json()
      setImage(response.url);
      // setImages(data)
    })();

    // fetchImages()
  }, []);
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const response = await fetch(
  //       `https://.picsum.photos/534/383`
  //     )
  //     const data = await response.json()
  //     console.log(data)
  //     setImages(data)
  //   }

  //   fetchImages()
  // }, [])

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
        {image ? (
          <img className="inner-picture" src={image} alt="" />
        ) : (
          <div className="inner-picture"></div>
        )}
        <h1>Name</h1>
        <i className="fa-solid fa-circle-check"></i>
        <div className="look">
          <span>age:</span>
          <span>eye color:</span>
        </div>
      </div>
    </>
  );
}

export default Photo;
