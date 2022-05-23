import React from "react";
import classes from "./CheckOut.module.css";
const CheckOut = (props) => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>{" "}
      <div className={classes.control}>
        <label htmlFor="name">Postal Code</label>
        <input type="text" id="postal" />
      </div>{" "}
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button type="submit">Confirm</button>
    </form>
  );
};

export default CheckOut;
