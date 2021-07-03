import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import logo from "./logo.png";
// import PhoneInput from "react-phone-number-input/input"

function Register(props) {
  const pnameRef = React.useRef();
  const phoneRef = React.useRef();
  const genderRef = React.useRef();
  const dobRef = React.useRef();
  const bloodRef = React.useRef();
  const dnameRef = React.useRef();
  const facultyRef = React.useRef();
  const licenceRef = React.useRef();
  const dphoneRef = React.useRef();
  const hnameRef = React.useRef();

  return (
    <div className="Main">
      <div className="Register">
        {/* <Navbar/> */}

        <div className="meDossier">
          <img
            src={logo}
            width="150"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          ></img>
        </div>
        <div className="heading">
          <h1> Welcome to MeDossier</h1>
          <h5>The only place to store and access your record securely</h5>
        </div>
        <div className="b-container">
          <div className="Patient small card">
            <h5>
              {" "}
              <b>Register as Patient</b>
            </h5>
            <form>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                ref={pnameRef}
                required
              ></input>
              <br />
              <label>PhoneNo: </label>
              <input
                type="text"
                placeholder="9746025484"
                ref={phoneRef}
                required
              />

              <br />
              <label>DateofBirth:</label>
              <input type="Date" ref={dobRef} required />
              <br />
              <label>Blood Group: </label>
              <input type="text" placeholder="O+ve" ref={bloodRef} required />
              <br />
              <label id="gender"> Gender:</label>
              <select ref={genderRef} required>
                <option value="Select ">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others"> Others</option>
              </select>
              <br />

              <Button
                onClick={(event) => {
                  event.preventDefault();
                  const name = pnameRef.current.value;
                  const phone = phoneRef.current.value;
                  const gender = genderRef.current.value;
                  const dob = dobRef.current.value;
                  const blood = bloodRef.current.value;
                  props.patientRegister(name, phone, gender, dob, blood);
                }}
              >
                {" "}
                <i class="fas fa-upload"></i>
                Submit{" "}
              </Button>
            </form>
          </div>
          <br />
          {/* Doctor login/signup
           */}
          <div className="Doctor small card">
            <h5>
              {" "}
              <b>Register as Doctor</b>
            </h5>
            <form>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                ref={dnameRef}
              ></input>
              <br />
              <label>License Number:</label>
              <input
                type="text"
                placeholder="License number"
                ref={licenceRef}
                required
              />
              <br />
              <label>Hospital Name:</label>
              <input
                type="text"
                placeholder="Name of the hospital"
                ref={hnameRef}
                required
              />
              <br />
              <label> ContactNo:</label>
              <input
                type="text"
                placeholder="9746025484"
                ref={dphoneRef}
                required
              />

              <br />
              <label>Faculty: </label>
              <input
                type="text"
                name="faculty"
                placeholder="Enter your faculty"
                ref={facultyRef}
                required
              />
              <br />
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  const name = dnameRef.current.value;
                  const contact = dphoneRef.current.value;
                  const faculty = facultyRef.current.value;
                  const hname = hnameRef.current.value;
                  const license = licenceRef.current.value;
                  props.doctorRegister(name, hname, faculty, contact, license);
                }}
              >
                {" "}
                <i class="fas fa-upload"></i> Submit
              </Button>
            </form>
          </div>
        </div>
        <div className="login small card">
          <h5>Already have an account?</h5>
          <Button
            onClick={() => {
              props.handlelogin();
            }}
          >
            {" "}
            <i class="fas fa-sign-in-alt"></i> Login
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default Register;
