// components/AdventureTypeSelect.tsx

import React from "react";

interface AdventureTypeSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AdventureTypeSelect: React.FC<AdventureTypeSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex m-5">
      <label className="m-1">Adventure Type</label>
      <select className="border rounded-lg" value={value} onChange={onChange}>
        <option value="hiking">Hiking</option>
        <option value="biking">Biking</option>
        <option value="climbing">Climbing</option>
        <option value="swimming">Swimming</option>
      </select>
    </div>
  );
};

export default AdventureTypeSelect;
