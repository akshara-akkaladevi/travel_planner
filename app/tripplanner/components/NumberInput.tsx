// components/NumberInput.tsx

import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="number" value={value} onChange={onChange} />
    </div>
  );
};

export default NumberInput;
