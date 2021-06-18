import React, { useRef, useState } from  "react";
import {Tabs, Tab, Row, Nav, Navbar,Card} from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./logo.png"
function Patient(props){
  const[records,setRecords] =useState([]);
    const doctorRef = useRef();

    const Details = ()=>{
        return(
            <Card> 
                <div className="Details">
                    <Card.Title>
                        Your Details
                    </Card.Title>
                    <Card.Body>
                   <b> Name:</b>{props.patient._name}
                  <br/>
                   <b>Phone: </b>{props.patient._phone}
                  <br/>
                  <b>Gender:</b>{props.patient._gender}
                  <br/>
                <b> Date of Birth:</b>{props.patient._dob}
                <br/> 
               <b> Blood Group: </b>{props.patient._bloodgroup}
             </Card.Body>
            </div>
            </Card>
        )
    }
    const Upload =()=>{
        return(
            <div className="ReportUpload">
              <div className="upload">

    <form>
      <label> 
        </label>
        <input type= "file" 
       
        />
        <br/>
         <Button>Submit</Button>
         </form>
         </div>

         {/* Upload file to blockchain */}
         <form>
         <label> Upload your record to blockchain  </label><br/>
          Name:<input 
         type ="text"placeholder="Name of the doctor" /><br/>

         Reason: <input 
         type="text" placeholder="Reason to visit hospital"/>
          <br/>
         VisitedDate: <input type="date"/>
             <br/>
         Your address:<input 
         type ="text"
         placeholder="Your address"/>
         <br/>
         <Button>Submit</Button>
         </form>
         </div>
        )
    }

  const Report =()=>{
    if(records.length  === 0){
      return(
        <div> 
          <h2>
          Your Report
        </h2>
        <p> Your record will appear here.
         <p> loading........</p>
        </p>
        </div>
      )
    }
    return(
      <div className="Report">
        <h2>
          Your Report
        </h2>
        <ul> 
           {records.map((record,key)=>( 
             <div className ="template" key={key}>
                    <li>
                      <Card>
                        <p><b> Doctor Name:</b></p>
                        <p><b> Reason to visit hospital:</b></p>
                        <p><b> Visited date:</b></p>
                        <p> <b>Report:</b> <a href={`https://google.com`}>Click here to view your report</a>
                        You can access your report here</p>
                        </Card>
                    </li>
                    </div>
                                     ))} 

                </ul>

      </div>
    )
  }
    return(
        
        <div className="patient_main">
            <Navbar 
            bg="light" 
            expand="lg">
              <img src={logo}
              width="150"
              height="50"
              className="d-inline-block align-top"
              />
            patient
              <Nav.Link href ="/" > Logout</Nav.Link>
              </Navbar>
            <h2> Welcome to Medossier</h2>
            <div className ="tab-wrapper">
                <div className="container-fluid">
                    <div className ="row">
                        <div className="col-sm-12">
                           
                        <Tabs defaultActiveKey="details" id ="uncontrolled-tab-example">
                        <Tab.Pane eventKey="details" title ="Details" tabClassName="profile-tabitem">
                              <Details/>
                </Tab.Pane>
                <Tab eventKey="profile" title ="AcessRecord" tabClassName="profile-tabitem">
                  <Report/>
                </Tab>

                <Tab eventKey ="uploadRecord"  title="UploadRecord" tabClassName="profile-tabitem">
              <Upload/>
             </Tab>
             </Tabs>
            </div> 
 </div>

  </div>
 </div>
</div>
)}
export default Patient;