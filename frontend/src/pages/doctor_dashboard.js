import React, { useState } from "react";
import Web3 from "web3";
import { withStyles } from "@material-ui/core/styles";
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
import { Tab, Row, Col, Nav } from "react-bootstrap";
import "./general.css";
import logo from "./logo.png";
import { CONTRACT_ADDRESS, ABI } from "../config.js";
import ipfs from "../ipfs.js";
import history from "./history";
var CryptoJS = require("crypto-js");

//main dashboard
function DocDashboard(props) {
  // const [currentAccount, setCurrentAccount] = useState(props.currentAccount);
  // const[contract, setContract] = useState(props.contract);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Female");
  const [dob, setDob] = useState("");
  const [blood, setBlood] = useState("");
  const [accountAddr, setAccountAddr] = useState("");
  const [authorized, isAuthorized] = useState("false");
  const [recordlen, setRecordLength] = useState(0);
  const [records, setRecords] = useState([]);
  const [dname, setDname] = useState("");
  const [visitedDate, setVisDate] = useState("");
  const [reason, setReason] = useState("");
  const [buffer, setBuffer] = useState(null);

  //get the data from local storage
  const docname = localStorage.getItem("docname");
  const faculty = localStorage.getItem("faculty");
  const license = localStorage.getItem("license");
  const hname = localStorage.getItem("hname");
  const isApproved = localStorage.getItem("isApproved");
  const contact = localStorage.getItem("contact");
  const currentAccount = localStorage.getItem("currentAccount");

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  const ispatient = localStorage.getItem("ispatient");
  const isAdmin = localStorage.getItem("isUser");

  //Get details of patient: can be accessed by anyone
  const getPatientDetails = async (e) => {
    try {
      const result = await contract.methods
        .getPatientDetails(accountAddr)
        .call();
      console.log(result);
      setName(result["_name"]);
      setPhone(result["_phone"]);
      setBlood(result["_bloodgroup"]);
      setGender(result["_gender"]);
      setDob(result["_dob"]);
    } catch (error) {
      console.log(error);
    }
    getPatientRecord();
  };
  //bullet tube vague brain excuse valley total whale scrap sense water unfold

  //Get access to the patient record: only to authorized doctor
  const getPatientRecord = async (e) => {
    try {
      //check whether doctor is authorized or not
      const access = await contract.methods
        .isAuthorized(accountAddr, currentAccount)
        .call();
      console.log(access);
      isAuthorized(access);

      //get the number of records
      const rlen = await contract.methods.getrecordlist(accountAddr).call();
      console.log(rlen);
      setRecordLength(rlen);

      if (authorized) {
        let record = [];
        for (var i = 0; i < recordlen; i++) {
          const result = await contract.methods
            .getPatientRecords(accountAddr, i)
            .call({ from: currentAccount });
          console.log(result);
          record.push({
            dname: result.dname,
            reason: result.reason,
            visDate: result.visitedDate,
            ipfs: result.ipfs,
          });
        }
        console.log(record);
        setRecords(record);
      } else {
        alert("Sorry! You are not authorized to get the whole record.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Only authorized doctor can add the patients record
  const addPatientRecord = async (e) => {
    try {
      //whether doctor is authorized or not
      const access = await contract.methods
        .isAuthorized(accountAddr, currentAccount)
        .call();
      console.log(access);
      isAuthorized(access);

      if (authorized) {
        //add the file buffer to ipfs
        let ipfshash = await ipfs.files.add(buffer);
        //url ro the ipfs stored file
        let url = "https://ipfs.io/ipfs/" + ipfshash[0].hash;
        var encryptedurl = props.encode(CryptoJS.AES.encrypt(JSON.stringify(url), 'dmr').toString());
        var decryptedurl = CryptoJS.AES.decrypt(props.decode(encryptedurl).toString(), 'dmr').toString(CryptoJS.enc.Utf8);
        console.log(encryptedurl)
        console.log(decryptedurl)
        console.log(ipfshash[0].hash);
        console.log(url.toString());
        // ipfshash[0].hash.toString()
        const hash = ipfshash[0].hash;
        // const hashs = String(hash)

        await contract.methods
          .addRecord(docname, reason, visitedDate, encryptedurl, accountAddr)
          .send({ from: currentAccount, gas: 1000000 });
      } else {
        alert("Sorry! You are not authorized to get the whole record.");
      }
    } catch (error) {
      console.log(error);
      alert("Error Uploading Report");
    }
  };

  //Get the uploaded file and set its buffer
  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const buffer = await Buffer.from(reader.result);
      setBuffer(buffer);
    };
  };

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

  if (!currentAccount) {
    history.push("/");
  }
  if (ispatient === "true") {
    history.push("/patient");
  }
  if (isAdmin === "true") {
    history.push("/registration");
  }

  const decrypt=(ipfshash)=>{
    try{
      var decryptedurl = CryptoJS.AES.decrypt(props.decode(ipfshash).toString(), 'dmr').toString(CryptoJS.enc.Utf8);
      decryptedurl = decryptedurl.slice(1,-1)
      console.log(decryptedurl)
    }
    catch(error){
      var decryptedurl = "https://ipfs.io/ipfs/" + ipfshash
    }
    
    return decryptedurl
  }

  return (
    <div className="DocDashboard">
      {/* Navbar */}
      <div className="navbar">
        <a href="/doctor_dashboard">
          <Button o>
            <img
              src={logo}
              width="120"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Button>
        </a>

        {/* <Button a href="/doctor_dashboard" > <i class="fas fa-1x fa-user-circle"></i> {docname}  </Button> */}

        <Button onClick={(e) => props.logout()}>
          {" "}
          <i class="fas fa-1x fa-sign-out-alt" /> Log out
        </Button>
      </div>
      {/* End Navbar */}

      {/* Side Tabs */}
      <div className="tab-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <Tab.Container defaultActiveKey="your_details">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <div>
                        <Nav.Item>
                          <Nav.Link eventKey="your_details">
                            My Details
                          </Nav.Link>
                        </Nav.Item>
                      </div>

                      <Nav.Item>
                        <Nav.Link eventKey="access_record">
                          Access Records
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="add_record">Add Records</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      {/* Doctors Details */}
                      <Tab.Pane eventKey="your_details">
                        <div className="Details">
                          <h4>....Welcome to the meDossier....</h4>
                          <h4>
                            ..This is the place where you can access your
                            patients records anywhere everywhere..
                          </h4>
                        </div>
                        <div className="card">
                          <h3>Your Details</h3>
                          <hr></hr>
                          <div>
                            <b>
                              Account Address:<span>{currentAccount}</span>
                            </b>
                          </div>
                          <div className="details">
                            <b>
                              Name :<span>{docname}</span>
                            </b>
                            <br></br>
                            <b>
                              License Number :<span>{license}</span>
                            </b>
                            <br></br>
                            <b>
                              Hospital Name :<span>{hname}</span>
                            </b>
                            <br></br>
                            <b>
                              Faculty :<span>{faculty}</span>
                            </b>
                            <br />
                            <b>
                              Contact :<span>{contact}</span>
                            </b>
                            <br></br>
                          </div>
                        </div>
                      </Tab.Pane>
                      {/* End Doctor Details */}

                      {/* Access Record Tab*/}
                      <Tab.Pane eventKey="access_record">
                        <div className="Details">
                          <h4>....Welcome to the meDossier....</h4>
                          <h4>
                            ..Before you access the records, ask the patient for
                            the permission..
                          </h4>
                        </div>
                        {/* Enter Address Container */}
                        <div class="small card">
                          <h5>
                            <b>Enter the address of Patient:</b>
                          </h5>
                          <TextField
                            id="outlined-basic full-width"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Patient Account Address"
                            onChange={(e) => setAccountAddr(e.target.value)}
                          />
                          <Button
                            onClick={getPatientDetails}
                            variant="contained"
                            style={{
                              backgroundColor: "#0080FF",
                              color: "floralwhite",
                              height: "10",
                              alignSelf: "end",
                            }}
                          >
                            Get Record
                          </Button>
                        </div>
                        {/* End Enter Address Container */}

                        {/* Patient Details */}
                        <div class="small card">
                          <Card>
                            <h4>Patient Name: </h4>
                            <b>Account Address:</b>
                            <div className="smallcard">
                              <div>
                                Name:{name}
                                {"\t\t"}
                              </div>
                              <div>Phone:{phone}</div>
                              <div>DoB:{dob}</div>
                              <div>Gender:{gender}</div>
                              <div>Blood Group:{blood}</div>
                            </div>
                          </Card>

                          <div className="table">
                            <Box mt={3} mb={3}>
                              <TableContainer component={Paper}>
                                <Table size={"small"}>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell>
                                        Doctor Name
                                      </StyledTableCell>
                                      <StyledTableCell>Reason</StyledTableCell>
                                      <StyledTableCell>
                                        Visited Date
                                      </StyledTableCell>
                                      <StyledTableCell>Report</StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {records.map((record, index) => {
                                      return (
                                        <StyledTableRow key={index}>
                                          <TableCell>
                                            {record["dname"]}
                                          </TableCell>
                                          <TableCell>
                                            {record["reason"]}
                                          </TableCell>
                                          <TableCell>
                                            {record["visDate"]}
                                          </TableCell>
                                          <TableCell>
                                            <a
                                                href={decrypt(record.ipfs)}
                                              target="_blrowank"
                                            >
                                              View/Download Record
                                            </a>
                                          </TableCell>
                                        </StyledTableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          </div>
                        </div>
                        {/* End Patient Details */}

                        {/* view patient records */}

                        {/* End Patient Record */}
                      </Tab.Pane>
                      {/* End Access Record */}

                      {/* Add Record */}
                      <Tab.Pane eventKey="add_record">
                        <div className="Details">
                          <h4>....Welcome to the meDossier....</h4>
                          <h4>..Upload the new records of your patients..</h4>
                        </div>
                        <div className="card">
                          <h3>Add Records</h3>
                          <hr></hr>
                          <form>
                            <TextField
                              id="outlined-basic full-width"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              label="Patient Account Address"
                              onChange={(e) => setAccountAddr(e.target.value)}
                            />
                            <TextField
                              id="outlined-basic"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              label="Doctor Name"
                              value={docname}
                              onChange={(e) => setDname({ docname })}
                            />
                            <TextField
                              id="outlined-basic"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              label="Visit Reason"
                              onChange={(e) => setReason(e.target.value)}
                            ></TextField>
                            <TextField
                              id="outlined-basic"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              type="date"
                              label="Visited Date"
                              onChange={(e) => setVisDate(e.target.value)}
                              InputLabelProps={{ shrink: true }}
                            ></TextField>
                            <TextField
                              type="file"
                              label="Report"
                              fullWidth
                              margin="normal"
                              InputLabelProps={{ shrink: true }}
                              onChange={captureFile}
                            ></TextField>
                            <Button
                              onClick={addPatientRecord}
                              variant="contained"
                              fullWidth
                              margin="normal"
                              style={{
                                backgroundColor: "#0080FF",
                                color: "floralwhite",
                              }}
                            >
                              Add Record
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

export default DocDashboard;

//Check the functions of the contract
// const gas = await contract.methods.addPatient("name","hname","contact","faculty","blue").estimateGas();
// const result = await contract.methods.addPatient("name","hname","contact","faculty","blue").send({from: currentAccount, gas: 1000000});
// const gas = await contract.methods.addDoctor("name","hname","contact","faculty").estimateGas();
// const result = await contract.methods.addDoctor("name","hname","contact","faculty").send({from: currentAccount, gas: 1000000}); // const gas = await contract.methods.grantAccess("0xAb5d5d8C5E257d35E41f955693b42d628C126A2E").estimateGas();
// const result = await contract.methods.grantAccess("0xc52Bb0B6A662859B2E182524585b2F0a676F7823").send({from: currentAccount,gas:1000000});
// console.log(result)
// const gas = await contract.methods.grantAccess("0xAb5d5d8C5E257d35E41f955693b42d628C126A2E").estimateGas();
// const result = await contract.methods.grantAccess("0xc52Bb0B6A662859B2E182524585b2F0a676F7823").send({from: currentAccount,gas:1000000});
// console.log(result)
