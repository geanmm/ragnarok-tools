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
      <label htmlFor={name} className="min-w-[100px] font-semibold">
        {label}
      </label>
      <input
        onClick={() => console.log(value)}
        type="text"
        value={value ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e.target.value);
        }}
        className="min-w-[100px] bg-zinc-200 text-black px-1 focus:outline-none"
      />
    </div>
  );
};

export default Input;
