import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../../leave.scss";
// import DateTimeInput from "./DateTime";
import { Oval } from "react-loader-spinner";
function LeaveForm() {
  const [formData, setFormData] = useState({
    lpuId: "",
    password: "",
    term: "Term-II",
    leaveType: "3",
    reason: "",
    stayAddress: "",
    leaveStartTime: "  ",
    leaveEndTime: "   ",
  });
  const [errors, setErrors] = useState({});
  const [serverData, setServerData] = useState("");
  const [ispending, setIsPending] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedDateTimeEnd, setSelectedDateTimeEnd] = useState("");
  const [isNightLeave, setIsNightLeave] = useState(false);

  //  useEffect(async()=>{
  //    const response=await axios.post(formData);
  //    console.log(res.data);
  //  },[])

  const dateConverter = (leaveStartTime) => {
    const date = new Date(leaveStartTime);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const HourTime = date.toLocaleString("en-US", options);
    console.log(HourTime);
    const dates = leaveStartTime.split("T")[0];
    // const time = event.target.value.split("T")[1];
    console.log(dates.split("-"));
    const dateArr = dates.split("-");
    const newDateArr = dateArr.map((date) => {
      return Number(date);
    });
    console.log(newDateArr);
    leaveStartTime = `${newDateArr[1]}/${newDateArr[2]}/${newDateArr[0]} ${HourTime}`;
    console.log(leaveStartTime);
    return leaveStartTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ispending) {
      return;
    }
    let {
      lpuId,
      password,
      term,
      leaveType,
      reason,
      stayAddress,
      leaveStartTime,
      leaveEndTime,
    } = formData;
    let formErrors = {};

    if (!lpuId) {
      formErrors.lpuId = "lpu id is required";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }
    if (!term) {
      formErrors.term = "pls select Term";
    }
    if (!leaveType) {
      formErrors.leaveType = "pls select Leave Type";
    }
    if (!reason) {
      formErrors.reason = "reason is required";
    }
    if (formData.leaveType === "1" && !stayAddress) {
      formErrors.stayAddress = "Stay Address is required";
    }
    if (!leaveStartTime) {
      formErrors.leaveStartTime = "leave start time is required";
    }
    if (!leaveEndTime) {
      formErrors.leaveEndTime = "leave end time is required";
    }

    setErrors(formErrors);

    if (!Object.keys(formErrors).length) {
      // send data to server
      // console.log(formData);

      // console.log(event.target.value);
      leaveStartTime = dateConverter(leaveStartTime);
      leaveEndTime = dateConverter(leaveEndTime);
      console.log(leaveEndTime, " handle", leaveEndTime);

      // console.log(dates, " tiem", time);
      // const date = new Date(event.target.value);
      // const options = { hour: "numeric", minute: "numeric", hour12: true };
      // const HourTime = date.toLocaleString("en-US", options);
      // console.log(HourTime);

      try {
        setIsPending(true);
        setServerData(" ");
        const res = await axios.post("https://lpuleave.me/api/leave", {
          lpuId,
          password,
          term,
          leaveType,
          reason,
          stayAddress,
          leaveStartTime,
          leaveEndTime,
        });
        if (res) {
          setServerData(res.data.message);
          setIsPending(false);
        }
      } catch (error) {
        console.log(error);
        setServerData(error.message);
        setIsPending(false);
      }
    }
  };

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function DateTimeInput() {
    // const handleChange = (event) => {

    //   setSelectedDateTime(event.target.value);
    // };

    let now = new Date();

    let date = now.toISOString().slice(0, 10);
    let time = now.toISOString().slice(11, 16);

    let minDateTime = date + "T" + time;

    return (
      <input
        type="datetime-local"
        min={minDateTime}
        value={formData.leaveStartTime}
        onChange={handleChange}
        name="leaveStartTime"
      />
    );
  }
  function DateTimeInputEnd() {
    let now = new Date();

    // if (formData.leaveType === "1") {
    //   let tommarrow = new Date(now);

    //   now.setDate(tommarrow.getDate() + 1);
    // }

    let date = now.toISOString().slice(0, 10);

    let time = now.toISOString().slice(11, 16);
    let minDateTime = date + "T" + time;

    return (
      <input
        type="datetime-local"
        min={minDateTime}
        onChange={handleChange}
        value={formData.leaveEndTime}
        name="leaveEndTime"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {ispending && (
        <div className="overlay">
          <Oval />
        </div>
      )}
      {serverData && <h3 style={{ color: "#f03e3e" }}>{serverData}</h3>}
      <h1>Lpu Leave </h1>

      <div>
        <label htmlFor="email">LPU id</label>
        <input
          type="text"
          name="lpuId"
          id="lpuId"
          value={formData.lpuId}
          onChange={handleChange}
        />
        {errors.lpuId && (
          <p style={{ color: "#f03e3e" }} className="error">
            {errors.lpuId}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p style={{ color: "#f03e3e" }}>{errors.password}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Term</label>
        {/* <input
          type="text"
          name="term"
          id="term"
          value={formData.term}
          onChange={handleChange}
        /> */}
        <div className="select">
          {" "}
          <select
            className="select-sel"
            value={formData.term}
            onChange={handleChange}
            name="term"
          >
            <option value="">Select</option>
            <option value="Term-I">Term-I</option>
            <option selected value="Term-II">
              Term-II
            </option>
          </select>
        </div>

        {errors.term && <p style={{ color: "#f03e3e" }}>{errors.term}</p>}
      </div>
      <div>
        <label htmlFor="email">Leave Type</label>
        <div className="select">
          {" "}
          <select
            className="select-sel"
            name="leaveType"
            onChange={handleChange}
            value={formData.leaveType}
          >
            <option value="">Select</option>
            <option selected value="3">
              Day Leave
            </option>
            <option value="1">Night Leave</option>
          </select>
        </div>

        {errors.leaveType && (
          <p style={{ color: "#f03e3e" }}>{errors.leaveType}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Reason</label>
        <input
          type="text"
          name="reason"
          id="reason"
          value={formData.reason}
          onChange={handleChange}
        />
        {errors.reason && <p style={{ color: "#f03e3e" }}>{errors.reason}</p>}
      </div>
      {formData.leaveType === "1" && (
        <div>
          <label htmlFor="email">Stay Address</label>
          <input
            type="text"
            name="stayAddress"
            id="stayAddress"
            value={formData.stayAddress}
            onChange={handleChange}
          />
          {errors.stayAddress && (
            <p style={{ color: "#f03e3e" }}>{errors.stayAddress}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="leaveStartTime">Leave Start Time</label>

        <DateTimeInput />

        {errors.leaveStartTime && (
          <p style={{ color: "#f03e3e" }}>{errors.leaveStartTime}</p>
        )}
      </div>
      <div>
        <label htmlFor="leaveEndTime">Leave End Time</label>
        <DateTimeInputEnd />

        {errors.leaveEndTime && (
          <p style={{ color: "#f03e3e" }}>{errors.leaveEndTime}</p>
        )}
      </div>
      <div className="form-group">
        <input
          id="formButton"
          className="btn"
          type="submit"
          placeholder="Send message"
        />
      </div>
    </form>
  );
}

export default LeaveForm;
