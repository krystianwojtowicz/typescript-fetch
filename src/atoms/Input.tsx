import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string;
  label: string;
}

const Input = ({ label, error, type, ...props }: InputProps) => {
  return (
    <>
      <div className="field">
        <label>{label}</label>
        <input type={type} {...props} />
      </div>
      <p>{error}</p>
      <hr />
    </>
  );
};

export default Input;
