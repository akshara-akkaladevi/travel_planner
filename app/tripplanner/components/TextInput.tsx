// components/TextInput.tsx

import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center m-5">
      <label className="m-1">{label}</label>
      <input
        className="border-2 rounded m-1 p-2"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
