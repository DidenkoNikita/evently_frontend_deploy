import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './CustomDatePicker.module.css';
import { useState } from 'react';

export const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.container}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className={styles.datePicker}
      />
    </div>
  );
};