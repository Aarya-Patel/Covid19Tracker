import React, { useRef, useEffect, useState } from "react";
import "./Dropdown.css";
import { CircularProgress } from "@material-ui/core";

export default ({ options, setCountry }) => {
  const [disabled, setDisabled] = useState(false);

  const selectRef = useRef();
  useEffect(() => {
    selectRef.current.disabled = disabled;
  }, [disabled]);

  return (
    <>
      <select
        ref={selectRef}
        className="dropdown"
        type="text"
        onChange={(e) => {
          //Find the corresponding option element with this country
          const elem = options.find(
            (element) => element.country === e.target.value
          );
          //Set a timeout event that change the country state after 3.5 sec
          // setCountry(elem.slug);
          console.log(elem.slug);
          setDisabled(true);

          setTimeout(() => {
            setCountry(elem.slug);
            setDisabled(false);
          }, 3500);
        }}
      >
        {options.map((opt, idx) => {
          return (
            <option value={opt.country} key={idx}>
              {opt.country}
            </option>
          );
        })}
      </select>
      {disabled ? <CircularProgress /> : null}
    </>
  );
};
