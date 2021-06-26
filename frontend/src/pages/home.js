import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input/input"

function Register(props){
    const pnameRef = React.useRef();
    const phoneRef = React.useRef();
    const genderRef = React.useRef();
    const dobRef = React.useRef();
    const bloodRef = React.useRef()
    const dnameRef = React.useRef();
    const facultyRef =React.useRef();
    const licenceRef =React.useRef();
    const dphoneRef = React.useRef();
    const hnameRef = React.useRef();
    const [err, Seterr]= useState();
    const [derr,Setderr] = useState();
    
    const pchangehandler = (event)=>{
    let phone = event.target.value
    let err =""
    if(Number(phone)){
    if(phone.length!==10){
        err = <h5>Must be 10 digit</h5>;
        // alert("Your number")
    }}
    else 
    err = <h5> Should be valid number</h5>
    Seterr(err);
}
    const dchangehandler = (event)=>{
        let phone = event.target.value
        let derr =""
        if(Number(phone)){
        if(phone.length!==10){
            derr = <h5 >Must be 10 digit</h5>;
        }}
        else 
        derr = <h5> Should be valid number</h5>
        Setderr(derr);
    
        
    }
    
    return(
        <div className="Main">

        <div className="Register">
            
            {/* <Navbar/> */}

            <div></div>
            <div className="heading">

            <h2> Signup/Login</h2>
            </div>
            <div className="b-container">

            <div className="Patient small card">
                <h3> Add Patient</h3>
                <form>
                <label>Name: </label>
                <input fullwidth type="text" name ="name" placeholder="Enter the patient's name"
                ref={pnameRef}  required 
                >
                    </input>
                    <br/>
                    <label>PhoneNo: </label>
                    <input type ="text" placeholder="9746025484" onChange ={pchangehandler}
                    ref ={phoneRef} required/>


                    <br/>
                    <label>DateofBirth:</label>
                    <input type = "Date" placeholder="2021-05-01" 
                    ref ={dobRef}required/>
                    <br/>
                    <label>Blood Group: </label>
                    <input type ="text" placeholder="O+ve"
                    ref ={bloodRef} required
                    />
                    <br/>
                    <label id ="gender"> Gender:</label>
                    <select ref ={genderRef} required >
                        <option value="Select " >Select</option>
                        <option value ="Female">Female</option>
                        <option value ="Male">Male</option>
                        <option value = "Others"> Others</option>
                        </select>
                        <br/>

                    <Button  onClick ={(event)=>{
                    event.preventDefault();
                    const name = pnameRef.current.value;
                    const phone = phoneRef.current.value;
                    const gender = genderRef.current.value;
                    const dob = dobRef.current.value;
                    const blood = bloodRef.current.value;
                    props.patientRegister(name,phone,gender,dob,blood);
                }}
                > 
                Submit </Button>
                <Button onClick ={()=>{
                    props.phandlelogin()
                }}
                >Login
                 </Button>
                </form>
                
            </div>
            <br/>
            {/* Doctor login/signup
            */}
            <div className="Doctor small card">
                <h3> Add Doctor</h3>
                <form>
                    <label>Name: </label>
                <input type="text"  name ="name" placeholder="Enter the your name" required 
                ref={dnameRef}>

                    </input>
                    <br/>
                    <label>License Number:</label>
                    <input type ="text" placeholder ="License number"
                    ref ={licenceRef} required/>
                    <br/>
                    <label>Hospital Name:</label>
                    <input type ="text" placeholder ="Name of the hospital"
                    ref ={hnameRef} required/>
                    <br/>
                    <label> ContactNo:</label>
                    <input type ="text" placeholder="9746025484" onChange ={dchangehandler}
                    ref ={dphoneRef} required/>
                   
                    {derr}
                    <br/>
                    <label>Faculty: </label>
                    <input type="text"  name ="faculty"placeholder="Enter the your faculty" 
                    ref ={facultyRef} required/>
                    <br/>
                    <Button onClick ={(event)=>{
                    event.preventDefault();
                    const name = dnameRef.current.value;
                    const contact = dphoneRef.current.value;
                    const faculty = facultyRef.current.value;
                    const hname = hnameRef.current.value;
                    const license = licenceRef.current.value;
                    props.doctorRegister(name,hname,faculty,contact,license); }}>Submit</Button>
                      <Button onClick ={()=>{
                    props.dhandlelogin()
                }}
                >Login
                 </Button>
                </form>
              
            </div>
            </div>
            <div className ="login small card">
                <h4>Already have an account?</h4>
                <Button onClick ={()=>{
                    props.handlelogin()
                }}
                >Login
                 </Button>

                
            </div>
             <div>    
            </div>
        </div>
        </div>

    )

}
export default Register;