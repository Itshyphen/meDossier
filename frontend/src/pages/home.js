import React, { useState } from "react";


function Register(props){
    const pnameRef = React.useRef();
    const phoneRef = React.useRef();
    const genderRef = React.useRef();
    const dobRef = React.useRef();
    const bloodRef = React.useRef()
    const dnameRef = React.useRef();
    const facultyRef =React.useRef();
    const dphoneRef = React.useRef();
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
            // alert("Your number")
        }}
        else 
        derr = <h5> Should be valid number</h5>
        Setderr(derr);
    
        
    }
    
    return(
        <div className="Register">
            
            {/* <Navbar/> */}

            <div></div>
            <div className="heading">

            <h2> Register</h2>
            </div>
            <div className="container">

            <div className="Patient">
                <h3> Register as Patient</h3>
                <form onSubmit ={(event)=>{
                    event.preventDefault();
                    const name = pnameRef.current.value;
                    const phone = phoneRef.current.value;
                    const gender = genderRef.current.value;
                    const dob = dobRef.current.value;
                    const blood = bloodRef.current.value;
                    props.patientRegister(name,phone,gender,dob,blood);
                }}>
                <label>Name: </label>
                <input type="text" name ="name" placeholder="Enter the patient's name"
                ref={pnameRef} required >
                    </input>
                    <br/>
                    <label>PhoneNo: </label>
                    <input type="text" name ="age" placeholder="Enter the patient's phonenumber" onChange={pchangehandler}
                    ref ={phoneRef} required />
                   {err}
                    <br/>
                    <label>DateofBirth:</label>
                    <input type = "text" placeholder="2021-05-01" 
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

                    <button>Submit</button>
                </form>
                <button onClick ={()=>{
                    props.login()
                    // history.push('/doctor')
                }}
                >Login
                 </button>
            </div>
            <div className="Doctor">
                <h3> Register as Doctor</h3>
                <form onSubmit={(event)=>{
                    event.preventDefault();
                    const name = dnameRef.current.value;
                    const contact = dphoneRef.current.value;
                    const faculty = facultyRef.current.value;
                    props.doctorRegister(name,faculty,contact);
                }}>
                    <label>Name: </label>
                <input type="text"  name ="name" placeholder="Enter the your name" required 
                ref={dnameRef}>
                    </input>
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
                    
                    <button>Submit</button>
                </form>
                <button onClick ={()=>{
                    props.login()
                    // history.push('/doctor')
                }}
                >Login
                 </button>
            </div>
            
            </div>

        </div>
    )

}
export default Register;