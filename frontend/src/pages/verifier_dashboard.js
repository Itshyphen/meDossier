import React, { useState } from "react";
import {Button,Tab, Card,Navbar,Nav} from "react-bootstrap";
import logo from "./logo.png"
import {Table, TableBody,TableCell,TableContainer,TableHead,TableRow}from "@material-ui/core";
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

function Verifier(props){
    const doctorRef = React.useRef();
    const licenseRef = React.useRef();
    

    const useStyles = makeStyles({
        table:{
          minWidth:700,
        },
        root:{
          width:"100%"
    
        },
        container:{
          maxHeight:440,
        }
      });

    const classes = useStyles();

    const StyledTablecell = withStyles((theme)=>({
      head:{
          backgroundColor:theme.palette.info.main,
          color : theme.palette.common.blue,
      },
      body:{
          fontSIze:14,
      },
   })) (TableCell);

   const StyledTableRow = withStyles((theme)=>({
       root:{
           "&:nth-of-type(odd)":{
               backgroundColor: theme.palette.action.hover,
               color: theme.palette.common.pink,
           },
       },
   }))(TableRow)
    //Doctor verification by government
  const verifydoctor = async(name,license)=>{
    try{
      console.log(name,license);
     await props.contract.methods.registerDoctor(name,license).send({from:props.currentAccount})
       await props.getDoctor();
    }
      catch(error){
        console.log(error);
      }

  }

const Verify = ()=>{
    // props.getdoctor();
        return(
            <div className="v-container">
                {/* {
                props.unverifieddoctor.map((record,key) =>(
            <Card >
            <Card.Title>
                Doctor to be verified
            </Card.Title>
            
                    <p>Doctor Name:{record.name}</p>
            <p>License Number:{record.licenseno}</p>
            <p>Hospital Name:{record.hospital}</p>
            <Button  name ={record.addr}
            onClick ={(e)=>{
                verifydoctor(e.target.name);
            }}
            disabled ={record.isApproved}
            >Verify</Button>
               
            
            </Card>  ))
            } */}
            <Card>
              <Card.Title>
                Register the doctor
              </Card.Title>
              <label> Name:</label>
              <input type="text" placeholder="Doctor's full name"
              ref ={doctorRef}
              required/>
              <label> License Number:</label>
              <input type ="number" placeholder="Doctor's license number" 
              ref ={licenseRef}
              required/>
              <Button onClick = {(event)=>{
                event.preventDefault();
                const name = doctorRef.current.value;
                const license = licenseRef.current.value;
                verifydoctor(name,license);


              }}> Submit</Button>
            </Card>

        </div>
        )
    }
const Doctor =()=>{
    // props.getunverifieddoctor()
    return(
        <div className="doctorlist">
            <h5> List of Approved doctors</h5> 
             <Paper className={classes.root}>
        <TableContainer  className={classes.container}>
                <Table className = {classes.table} size ="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <StyledTablecell> #</StyledTablecell>
                            <StyledTablecell>Name</StyledTablecell>
                            <StyledTablecell>Hospital</StyledTablecell>
                            <StyledTablecell>Faculty</StyledTablecell>
                            <StyledTablecell>License Number</StyledTablecell>
                            <StyledTablecell>Contact Number</StyledTablecell>



                            {/* <StyledTablecell>Status</StyledTablecell> */}
                        </TableRow>
                    </TableHead>
                    {props.doctors.map((record,key)=>( 

                    <TableBody>

                        <StyledTableRow >
                          <TableCell></TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.hname}</TableCell>
                        <TableCell>{record.faculty}</TableCell>
                        <TableCell>{record.licenseno}</TableCell>
                        <TableCell>{record.contact}</TableCell>
                        </StyledTableRow>
                    </TableBody>
                     ))} 
                </Table>
            </TableContainer>
            </Paper>
        </div>
    )

}
    return(
        <div className="verifer"> 
         <Navbar
            expand="lg" 
            >
              <img src={logo}
              width="250"
              height="60"
              className="d-inline-block align-top"
              />
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link  > <b>{props.owner} </b> </Nav.Link>
              <Nav.Link href ="/" width="250"> <b>Logout</b></Nav.Link>
              </Navbar.Collapse>
              </Navbar>

        <div className ="tab-wrapper">
            <Tab.Container  defaultActiveKey="doctor">
                    <div className ="row">
                        <div className="col-sm-3">
                          <Nav  className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="doctor">Doctors</Nav.Link><hr/>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="verify">Verify</Nav.Link> <hr/></Nav.Item>                           
                            </Nav> 
                          </div>

                          <div className = "col-sm-9">
                          <h2> Welcome to Medossier</h2>

                            <Tab.Content>
                <Tab.Pane eventKey="doctor" title ="Doctor" >
                    <Doctor/>
                </Tab.Pane>
                <Tab.Pane eventKey="verify" title ="Verify" >
                    <Verify/>
                </Tab.Pane>
             </Tab.Content>
            </div> 
            </div>
            </Tab.Container>
             </div>
        </div>
    )
}
export default Verifier;