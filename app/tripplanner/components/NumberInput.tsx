// components/NumberInput.tsx

import React from "react";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="m-5">
      <label className="m-1">{label}</label>
      <input
        className="border border-blue-500 rounded-lg w-10 p-1"
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default NumberInput;
