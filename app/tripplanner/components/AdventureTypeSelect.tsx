// components/AdventureTypeSelect.tsx

import React from 'react';

interface AdventureTypeSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AdventureTypeSelect: React.FC<AdventureTypeSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Adventure Type</label>
      <select value={value} onChange={onChange}>
        <option value="hiking">Hiking</option>
        <option value="biking">Biking</option>
        <option value="climbing">Climbing</option>
        <option value="swimming">Swimming</option>
      </select>
    </div>
  );
};

export default AdventureTypeSelect;
