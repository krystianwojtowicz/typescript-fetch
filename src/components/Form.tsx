import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import Input from "../atoms/Input";
import './styles/Form.scss';

interface RegisterFormData {
  password: string;
  login: string;
  email: string;
  phone: string;
  mark: boolean;
}

interface StarWarsPerson {
  // vehicles: string[];
  // created: string;
  // name: string;
  gender: string;
  email: string;
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
    console.log(formValues)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues)
  };

  useEffect(()=> {
    setFormValues(prev=>({ ...prev, mark: isChecked }));
  },[isChecked])

  useEffect(()=> {
    if(isSubmit) {
            setFormErrors(validate(formValues));
    }
    },[formValues])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    console.log(formErrors)
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      console.log(formErrors);
      fetch("https://example/", {
        method: "post",
        body: JSON.stringify({ ...formValues, starWarsData }),
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
      errors.login = "musisz wpisa?? login";
    }else errors.login = ""
    if (!values.password) {
      errors.password = "musisz wpisa?? has??o";
    }
    if (!values.email) {
      errors.email = "musisz wpisa?? email";
    } else if (!values.email.match(/.+@.+/)) {
      errors.email = "Nieprawid??owy format adresu e-mail";
    }
    if (!values.phone) {
      errors.phone = "musisz wpisa?? numer telefonu";
    } else if (!/^\d{9}$/.test(values.phone)) {
      errors.phone = "Nieprawid??owy numer telefonu";
    }
    if (values.mark===false) {
      errors.mark = "Wymagana akceptacja regulaminu";
    }
    return errors;
  };
  const getData = async () => {
    const res = await fetch(
      // `https://swapi.py4e.com/api/people/${apiRequestCounter}`
      `https://randomuser.me/api/?results=${apiRequestCounter}`
    );
    const data = await res.json();
    const result = data.results[0]
    console.log(result)
    // console.log(data)
    setStarWarsData([
      // { name: data.name, created: data.created, vehicles: data.vehicles },
      { gender: result.gender, email: result.email },
    ]);
    console.log(starWarsData)
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
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <button className="next-profiles" onClick={handleClick}>
        <span className="inner-next-profiles">next profiles</span>
      </button>
      <div className="form">
        <h1 className='h1form'>formularz rejestracyjny</h1>
        <hr className="under-h1" />
          <form onSubmit={handleSubmit} className="inner-form">
          <Input value={formValues.login}
                  onChange={handleChange} error={formErrors.login} name="login" type="text" label="Login:"> 
          </Input>
          <Input value={formValues.password}
                  onChange={handleChange} error={formErrors.password} name="password" type="text" label="Has??o:"> 
          </Input>
          <Input value={formValues.email}
                  onChange={handleChange} error={formErrors.email} name="email" type="text" label="Email:"> 
          </Input>
          <Input value={formValues.phone}
                  onChange={handleChange} error={formErrors.phone} name="phone" type="text" label="Numer Telefonu:"> 
          </Input>
              <div className="wrapper-field">
              <div className="field checkbox">
                
                <input
                className="input"
                  type="checkbox"
                  name="mark"
                  checked={isChecked}
                  onChange={handleChecbox}
                />
                <label>Akceptuj?? Regulamin</label>
                <p>{formErrors.mark}</p>
              </div>
              
              </div>
              <button className='submit'
              type="submit">
                <span className="inner-submit">zapisz</span>
              </button>
          </form>
      </div>
    </>
  );
};

export default Form;