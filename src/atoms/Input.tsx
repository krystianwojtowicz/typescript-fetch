import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string;
  label: string;
}

const Input = ({ label, error, type, ...props }: InputProps) => {
  return (
    <div className="wrapper-field">
    <div className="field">
          <label>{label}</label>
        <p>{error}</p>
          <input className="input"
          {...props}
          />
        </div>
        <p>{error}</p>
        <hr />
    </div>
  );
};

export default Input;