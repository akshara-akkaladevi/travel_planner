// components/DateInput.tsx

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

interface DateInputProps {
  label: string;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="flex m-5">
      <div className="flex justify-center items-center">
        <label className="date-label">{label}</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="From date"
          className="p-2 border border-gray-300 rounded text-sm m-1"
        />
      </div>
      <div className="flex justify-center items-cente">
        {/*<label className="date-label">To Date:</label>*/}
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="To date"
          className="p-2 border border-gray-300 rounded text-sm m-1"
        />
      </div>
    </div>
  );
};

export default DateInput;
