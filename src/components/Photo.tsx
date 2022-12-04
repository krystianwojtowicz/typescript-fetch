import { useState, useEffect } from "react";
import './styles/Photo.scss';


function Photo() {
  const [image, setImage] = useState<string>("");

  const getPhoto = async () => {
    const response = await fetch(`https://picsum.photos/534/383`);
    setImage(response.url);
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <>
      <header className="header">
        <div className="name">
          Krystian Wójtowicz
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
        <h1 className="h1name">Name</h1>
        <i className="fa-solid fa-circle-check"></i>
        <div className="look">
          <span className="inner-look">age:</span>
          <span className="inner-look">eye color:</span>
        </div>
      </div>
    </>
  );
}

export default Photo;

