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
    <div className="date-container m-5">
      <div className="date-picker">
        <label className="date-label">{label}</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="From date"
          className="date-input m-1"
        />
      </div>
      <div className="date-picker">
        {/*<label className="date-label">To Date:</label>*/}
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="To date"
          className="date-input"
        />
      </div>
    </div>
  );
};

export default DateInput;
