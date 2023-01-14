import React, { useState } from "react";

function DateTimeInput() {
  const [selectedDateTime, setSelectedDateTime] = useState("");

  const handleChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  let now = new Date();
  let date = now.toISOString().slice(0, 10);
  let time = now.toISOString().slice(11, 16);
  let minDateTime = date + "T" + time;

  return (
    <input
      type="datetime-local"
      min={minDateTime}
      value={selectedDateTime}
      onChange={handleChange}
    />
  );
}

export default DateTimeInput;
