import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Card,
  Box,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Tabs, Tab, Row, Col, Nav } from "react-bootstrap";
import "./general.css";
import logo from "./logo.png";
import { CONTRACT_ADDRESS, ABI } from "../config.js";
import ipfs from "../ipfs.js"



//main dashboard
function Verifier(props) {

  const [recordlen, setRecordLength] = useState(0);
  const [records, setRecords] = useState([]);
  const [dname, setDname] = useState("");
  const [license, setLicense] = useState(0);
 


  const currentAccount =localStorage.getItem('currentAccount')

  const web3 = new Web3(Web3.givenProvider)
  const contract =  new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  

 

  
    const Register = async (e) => {
      try {
        //whether doctor is authorized or not
        
  
        await contract.methods
          .registerDoctor(dname, license)
          .send({ from: currentAccount, gas: 1000000 });
      }
      catch (error) {
        console.log(error);
        alert("Error in Registration"); 
      }
    };
  
  

  const getDoctorsList = async (e) => {
    try {
      //check whether doctor is authorized or not

      //get the number of records
      const rlen = await contract.methods.getRegisteredDoctorslength().call();
      console.log("record length"+rlen);
      setRecordLength(rlen);

      
        let record = [];
        for (var i = 0; i < recordlen; i++) {
          const licn = await contract.methods
            .getRegisteredDoctorsList(i)
            .call({ from: currentAccount });
          console.log(licn);
          try{
            const result = await contract.methods
            .getDoctorbyLicense(licn)
            .call({ from: currentAccount });
          console.log(result);
          record.push({
            dname: result.name,
            hname: result.hospital,
            faculty: result._faculty,
            license: licn,
          });
          }
          catch{
            record.push({
              dname: "No account/Not Logged in After Registration",
              hname: "----",
              faculty: "----",
              license: licn,
            });
          }
        
        }
        console.log(record);
        setRecords(record);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getDoctorsList()
    // getDoctorDetails();
  },[
    recordlen
  ]);


  //Styling for table cell
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.blue,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  return (
    

    <div className="Registrer">
      {getDoctorsList}

      {/* Navbar */}
      <div className="navbar">
        <a href="/Registration_office">
        <Button >
           <img
          src={logo}
          // width="200"
          // height="80"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
                          </Button>

        </a>
      
       
        <Button onClick={e=>props.logout()}>Log out</Button>
      </div>
      {/* End Navbar */}

      {/* Side Tabs */}
      <div className="tab-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <Tab.Container defaultActiveKey="doctors_list">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <div>
                        <Nav.Item>
                          <Nav.Link eventKey="doctors_list">
                            Registered Doctors
                          </Nav.Link>
                        </Nav.Item>
                      </div>

                      <Nav.Item>
                        <Nav.Link eventKey="new_registration">New Registration</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                  <Tab.Content>

{/* Doctors Details */}
<Tab.Pane eventKey="doctors_list">
<div className="Details">
<h4>
....Welcome to the meDossier....
</h4>
<h4>..The Following Doctors are Registered..</h4>
</div>
  
  {/* Registered Doctor List */}
  <div class="small card">
    <div className="table">
  <Box mt={3} mb={3}>
    <TableContainer component={Paper}>
      <Table size={"small"}>
        <TableHead>
          <TableRow>
            <StyledTableCell>License</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>
              Faculty
            </StyledTableCell>
            <StyledTableCell>Working Hospital</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => {
            return (
              <StyledTableRow key={index}>
                <TableCell>{record["license"]}</TableCell>
                <TableCell>{record["dname"]}</TableCell>
                <TableCell>{record["faculty"]}</TableCell>
                <TableCell>{record["hname"]}</TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
    
  </div>
  </div>

</Tab.Pane>


<Tab.Pane eventKey="new_registration">
<div className="Details">
<h4>
....Welcome to the meDossier....
</h4>
<h4>..New Doctor Registration..</h4>
</div>
  <div className="small card">
    <h3>Register Doctor</h3>
    <hr></hr>
    <form>
      <TextField
        id="outlined-basic full-width"
        fullWidth
        variant="outlined"
        margin="normal"
        label="License Number"
        onChange={(e) => setLicense(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        fullWidth
        variant="outlined"
        margin="normal"
        label="Doctor Name"
        onChange={(e) => setDname(e.target.value)}
      />
      
      <Button
        onClick={Register}
        variant="contained"
        fullWidth
        margin="normal"
        style={{
          backgroundColor: "#0080FF",
          color: "floralwhite",
        }}
      >
        Register
      </Button>
    </form>
  </div>
</Tab.Pane>
</Tab.Content>
</Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Verifier;

