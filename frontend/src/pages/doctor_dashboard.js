import React from 'react';
import ReactDOM from 'react-dom';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table,TableHead,TableContainer,TableBody,TableCell,TableRow,Chip,Card,Grid,Box,Paper, Typography,TextField, Button,CircularProgress} from '@material-ui/core';
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';
import './general.css'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png'
// import Tab from 'react-bootstrap/Tab'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Sonnet from 'react-bootstrap/Sonnet'

function PaientRecords(){
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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  
  return (
    <Box mt={3} mb={3}>
    <TableContainer component={Paper}>   
    <Table size={"small"}>
        <TableHead>
            <TableRow>
                <StyledTableCell>
                    Doctor Name
                </StyledTableCell>
                <StyledTableCell>
                    Reason
                </StyledTableCell>
                <StyledTableCell>
                    Visited Date
                </StyledTableCell>
                <StyledTableCell>
                    Report
                </StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {/* {rows.map(
                (row,index)=>{
                    return(<StyledTableRow key={index}>
                        <TableCell>{row["dname"]}</TableCell>
                        <TableCell>{row["reason"]}</TableCell>
                        <TableCell>{row["visDte"]}</TableCell>
                        <TableCell><a href={"/#/embed/"+row["ipfs"]} target="_blank">View/Download Record</a></TableCell>
                    </StyledTableRow>)
                }
            )} */}

            
        </TableBody>
    </Table>
    </TableContainer> 
    </Box>

  );

}

function AddRecords(){
  return(
    <div className = "card">
    
                <h3>Add Records</h3>
                <hr></hr>
                <form>
                <TextField id="outlined-basic full-width" fullWidth variant="outlined" margin="normal" label="Patient Account Address" onChange=""/>
                <TextField id="outlined-basic" fullWidth variant="outlined" margin="normal" label="Doctor Name" onChange=""/>
                <TextField id="outlined-basic" fullWidth variant="outlined" margin="normal" label="Visit Reason" onChange=""></TextField>
                <TextField id="outlined-basic" fullWidth variant="outlined" margin="normal" type="date" label="Visited Date" onChange="" InputLabelProps={{ shrink: true }}></TextField>
                <TextField type="file"  label="Report" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange=""></TextField>
                <Button onClick="" variant="contained" fullWidth margin="normal" style={{backgroundColor:"#0080FF",color:"floralwhite"}}>Add Record</Button>
                </form>
            
        </div>
  );

 

}

function GetPatientDetails(){
  return(
   <div class="container">
                      <Card>
                        <h4>Patient Name: </h4>
                        <b>Account Address:</b>
                        <div className="smallcard">
                        <div>
                            Name:
                            {/* {"\t\t"+this.state.name} */}
                            {"\t\t"}
                            </div>
                            <div>
                            Phone:
                            {/* {"\t\t"+this.state.phone} */}
                            </div>
                            <div>
                            DoB:
                            {/* {"\t\t"+this.state.dob} */}
                            </div>
                            <div>
                            Gender:
                            {/* {"\t\t"+this.state.gender} */}
                            </div>
                            <div>
                            Blood Group:
                            {/* {"\t\t"+this.state.bg} */}
                            </div>
                        
                        </div>
                        </Card>
                        </div>

  );

}

function GetDoctorDetails(){
  return(
<div className = "card">
  <h3>Your Details</h3>
  <hr></hr>
  <div>
  <b>Account Address:<span></span></b>
  </div>
  <div className ="details">
  <b>Name:<span></span></b>
  <br></br>
  <b>Lisence No:<span></span></b>
  <br></br>
  <b>Hospital Name:<span></span></b>
  <br></br>
  <b>Faculty:<span></span></b>
  <br/>
  <b>Contact<span></span></b>
  <br></br>
 
  </div>
  
  
</div>
  );
}

function GrantAccess(){

}

function RevokeAccess(){

}

function AccessedPatient(){

}



function DocDashboard(){
    return(
      <div>
      <div className="navbar">
      
        <img
            src={logo}
            // width="200"
            // height="80"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
    
      </div>

<div className="tab-wrapper">
      <div className='container-fluid' >
        <div className="row">
          <div className="col-sm-12">

            <Tab.Container defaultActiveKey="your_details">
              <Row>
                <Col sm={3}>

                  <Nav variant="pills" className="flex-column">
                    <div>
                    <Nav.Item>
                      <Nav.Link eventKey="your_details">Information Details</Nav.Link>
                    </Nav.Item>
                    </div>

                    <Nav.Item>
                      <Nav.Link eventKey="access_record">Access Records</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="add_record">Add Records</Nav.Link>
                    </Nav.Item>

                  </Nav>

                </Col>
                <Col sm={9}>
                  <Tab.Content>

                    <Tab.Pane eventKey="your_details">
                     <GetDoctorDetails />
                    </Tab.Pane>

                    <Tab.Pane eventKey="access_record">
                      <div class="small card">
    
                          <h5><b>Enter the address of Patient:</b></h5>
                          <TextField id="outlined-basic full-width" fullWidth variant="outlined" margin="normal" label="Patient Account Address" onChange=""/>
                          <Button onClick="" variant="contained"  style={{backgroundColor:"#0080FF",color:"floralwhite", height:"10", alignSelf:"end"}}>Get Record</Button>
                      
                      </div>
                      <GetPatientDetails />
                      <PaientRecords />

                    </Tab.Pane>

                    <Tab.Pane eventKey="add_record">
                    <AddRecords />
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
    )
}
export default DocDashboard;