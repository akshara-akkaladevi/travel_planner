// components/TextInput.tsx

import React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default TextInput;
