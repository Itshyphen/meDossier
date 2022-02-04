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
import { Tabs, Tab, Row, Col, Nav, Navbar } from "react-bootstrap";
import "./general.css";
import logo from "./logo.png";
import { CONTRACT_ADDRESS, ABI } from "../config.js";
import history from "./history";

//main dashboard
function Verifier(props) {
  const [recordlen, setRecordLength] = useState(0);
  const [records, setRecords] = useState([]);
  const [dname, setDname] = useState("");
  const [license, setLicense] = useState(0);

  const currentAccount = localStorage.getItem("currentAccount");
  const isDoctor = localStorage.getItem("isdoctor");
  const ispatient = localStorage.getItem("ispatient");

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  const Register = async (e) => {
    try {
      //whether doctor is authorized or not

      await contract.methods
        .registerDoctor(dname, license)
        .send({ from: currentAccount, gas: 1000000 });
    } catch (error) {
      console.log(error);
      alert("Error in Registration");
    }
  };

  const getDoctorsList = async (e) => {
    try {
      //check whether doctor is authorized or not

      //get the number of records
      const rlen = await contract.methods.getRegisteredDoctorslength().call();
      console.log("record length" + rlen);
      setRecordLength(rlen);

      let record = [];
      for (var i = 0; i < recordlen; i++) {
        const licn = await contract.methods
          .getRegisteredDoctorsList(i)
          .call({ from: currentAccount });
        console.log(licn);
        try {
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
        } catch {
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

  useEffect(() => {
    getDoctorsList();
    // getDoctorDetails();
  }, [recordlen]);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();

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
  if (isDoctor == "true") {
    history.push("/doctor_dashboard");
  }

  if (ispatient == "true") {
    history.push("/patient");
  }

  return (
    <div className="Registrer">
      <div className="nav_main">
        {getDoctorsList}
        <Navbar
          // bg="light"
          color="purple"
          expand="lg"
        >
          <img
            src={logo}
            width="120"
            height="40"
            className="d-inline-block align-top"
          />
          {/* patient */}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link a href="/registration">
              {" "}
              <i class="far fa-1x fa-user-circle">
                {" "}
                <b>License Registration Office</b>{" "}
              </i>{" "}
            </Nav.Link>
            <Button onClick={(e) => props.logout()}>
              {" "}
              <i class="fas fa-1x fa-sign-out-alt" /> Log out
            </Button>
          </Navbar.Collapse>
        </Navbar>
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
                            <b> Registered Doctors</b>
                          </Nav.Link>
                          <hr />
                        </Nav.Item>
                      </div>
                      <Nav.Item>
                        <Nav.Link eventKey="new_registration">
                          {" "}
                          <b>New Registration </b>
                        </Nav.Link>
                        <hr />
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      {/* Doctors Details */}
                      <Tab.Pane eventKey="doctors_list">
                        <div className="Details">
                          <h3>Welcome to the MeDossier</h3>
                          <br />
                          <h5>The Following Doctors are Registered</h5>
                        </div>

                        {/* Registered Doctor List */}
                        <div class="small-card">
                          <div className="table">
                            <Box mt={3} mb={3}>
                              <Paper className={classes.root}>
                                <TableContainer className={classes.container}>
                                  <Table
                                    className={classes.table}
                                    size={"small"}
                                    stickyHeader
                                    aria-label="sticky table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <StyledTableCell>
                                          License
                                        </StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>
                                          Faculty
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          Working Hospital
                                        </StyledTableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {records.map((record, index) => {
                                        return (
                                          <StyledTableRow key={index}>
                                            <TableCell>
                                              {record["license"]}
                                            </TableCell>
                                            <TableCell>
                                              {record["dname"]}
                                            </TableCell>
                                            <TableCell>
                                              {record["faculty"]}
                                            </TableCell>
                                            <TableCell>
                                              {record["hname"]}
                                            </TableCell>
                                          </StyledTableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Paper>
                            </Box>
                          </div>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="new_registration">
                        <div className="Details">
                          <h3>Welcome to the MeDossier</h3>
                          <br />
                          <h5>New Doctor Registration</h5>
                        </div>
                        <div className="small card">
                          <h3>Register Doctor</h3>
                          <hr></hr>
                          <form>
                            <TextField
                              id="outlined-basic full-width"
                              fullWidth={true}
                              variant="outlined"
                              margin="normal"
                              label="License Number"
                              // style ={{height:60}}
                              onChange={(e) => setLicense(e.target.value)}
                            />
                            <TextField
                              id="outlined-basic"
                              fullWidth={true}
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
