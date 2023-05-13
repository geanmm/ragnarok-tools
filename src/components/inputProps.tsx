import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: any;
  handleChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ name, label, value, handleChange }) => {
  return (
    <div className="input-wrapper flex items-center pb-1">
      <label htmlFor={name} className="w-[90px] font-semibold">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e.target.value);
        }}
        className="w-auto bg-zinc-200 text-black px-1 focus:outline-none"
      />
    </div>
  );
};

export default Input;
