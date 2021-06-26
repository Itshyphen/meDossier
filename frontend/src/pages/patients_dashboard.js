import React, { useRef, useState } from  "react";
import {Tabs, Tab, Row, Nav, Navbar,Card,Button} from "react-bootstrap";
import {withStyles,makeStyles} from '@material-ui/core/styles';
import {Table, TableBody,TableCell,TableContainer,TableHead,TableRow}from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ipfs from "../ipfs";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./logo.png"

function Patient(props){
   const dnameRef = useRef();
   const reasonRef = useRef();
   const dateRef = useRef();
   const addressRef = useRef();
   const [ipfshash, setIpfshash] =useState();
   const[buffer,setBuffer] = useState();
  console.log(props.records);
  console.log(props.patient);
    const doctorRef = useRef();
    const grantRef = useRef();
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


    const uploadrecord= async(dname,reason,date,address)=>{
      try{
        console.log("hh")
        console.log(dname,reason,date);
        console.log(props.currentAccount);
        console.log(props.contract);
         const res = await props.contract.methods.addRecord(dname,reason,date,ipfshash,props.currentAccount).send({from:props.currentAccount});
        console.log(res);
       await  props.getPatientRecord();

      }catch(error){
        alert(error)

      }
    }

    const Details = ()=>{
        return(
          <div className="Details">
            <h2>
                  Your Details

                  </h2>

            <Card > 
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
            </Card>
            </div>

        )
    }
const handlechange = async(event)=>{
  event.preventDefault();
            //capture the userfile 
            const file = event.target.files[0];
            //Read the file
            let reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            //file is converted to a buffer to prepare for uploading to IPFS
            reader.onloadend=()=>{
                let buffer = Buffer(reader.result)
                setBuffer(buffer);
                console.log("buffer",buffer);
            }

}
const onsubmit = async(event)=>{
  event.preventDefault();
  console.log("hh");
  const ipfsHash = await ipfs.add(buffer);
  console.log(ipfsHash);
        console.log(ipfsHash[0].hash)
        setIpfshash(ipfsHash[0].hash);

}

    const Upload =()=>{
        return(
            <div className="ReportUpload">
              <h2> Report Upload</h2>
              <Card className="card">

              <div className="upload">
                <label> Upload your report to IPFS</label>
    <form onSubmit={onsubmit}>
      <label> 
        </label>
        <input type= "file"  onChange ={handlechange}
       
        />
        <br/>
         <Button onClick={onsubmit}>Submit</Button>
         </form>
         </div>

         {/* Upload file to blockchain */}
         <form 
        //  onSubmit= {(event)=>{
        //    event.preventDefault();
        //    uploadrecord();
        //  }}
         >
         <label> Upload your record to blockchain  </label><br/>
          Name:<input 
         type ="text"placeholder="Name of the doctor" 
         ref={dnameRef}/><br/>

         Reason: <input 
         type="text" placeholder="Reason to visit hospital"
         ref ={reasonRef}
         />
          <br/>
         VisitedDate: <input type="date" 
         ref ={dateRef}/>
             <br/>
         Your address:<input 
         type ="text"
         placeholder="Your address"
         ref ={addressRef}/>
         <br/>
         {/* <input type ="submit"/> */}
         <Button onClick={(event)=>{
           event.preventDefault();

           const dname = dnameRef.current.value;
           const reason = reasonRef.current.value;
           const date = dateRef.current.value;
           const address = reasonRef.current.value

           uploadrecord(dname,reason,date,address);
         }}>Submit</Button>
         </form>
         </Card>
         </div>
        )
    }

  const Report =()=>{
    // props.getPatientRecord();
    if(props.records.length  === 0){
      return(
        <div> 
          <h2>
          Your Report
        </h2>
        <p> Your record will appear here.</p>
         <p> loading........</p>
        </div>
      )
    }
    
    return(
      <div className="Report">
        <h2>
          Your Report
        </h2>
        <Paper className={classes.root}>
        <TableContainer  className={classes.container}>
                <Table className = {classes.table} size ="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <StyledTablecell> #</StyledTablecell>
                            <StyledTablecell>
                                Doctor name
                            </StyledTablecell>
                            <StyledTablecell>Reason to visit doctor </StyledTablecell>
                            <StyledTablecell>VisitedDate</StyledTablecell>
                            <StyledTablecell>Records</StyledTablecell>
                        </TableRow>
                    </TableHead>
                    {props.records.map((record,key)=>( 

                    <TableBody>

                        <StyledTableRow key ={key}>
                          <TableCell>{key}</TableCell>
                        <TableCell>{record.dname}</TableCell>
                        <TableCell>{record.reason}</TableCell>
                        <TableCell>{record.visitedDate}</TableCell>
                        <TableCell><a href={`https://ipfs.io/ipfs/${record.ipfs}`} target="_blank"> click here to view your record</a></TableCell>
                        </StyledTableRow>
                    </TableBody>))}
                </Table>
            </TableContainer>
            </Paper>
      </div>
    )
  }
  const Access=()=>{
return(
  <div>
    <h2>Grant/Revoke Access</h2>
    <Card>

            <form 
            // onSubmit ={(event)=>{
            //     event.preventDefault();
            //     const doctor = doctorRef.current.value;
            //     props.grantAccess(doctor);
            // }}
            >
                <label>Provide Access: </label>
                <input type="text" placeholder=" Address to grant access"
                ref ={grantRef}/> 
                <Button onClick ={(event)=>{
                  event.preventDefault();
                  const doctor = grantRef.current.value;
                  console.log(doctor)
                  props.grantAccess(doctor);
              }}> Submit</Button>
                </form>

                <br/>
                <form 
                // onSubmit ={(event)=>{
                //     event.preventDefault();
                //     const doctor = doctorRef.current.value;
                //     props.revokeAccess(doctor);
                // }}
                >
                    <label> Revoke Access: </label>
                    <input type="text" placeholder=" Address to revoke access from"
                    ref={doctorRef}/>
                <Button onClick  ={(event)=>{
                    event.preventDefault();
                    const doctor = doctorRef.current.value;
                    console.log(doctor);
                    props.revokeAccess(doctor);
                }}> Submit</Button>
                </form>
                </Card>

  </div>
)
  }
    return(
        
        <div className="patient_main">

            <Navbar
            // bg="light" 
            color="purple"
            expand="lg" 
            >
              <img src={logo}
              width="250"
              height="60"
              className="d-inline-block align-top"
              />
            {/* patient */}
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text > <b>Welcome </b> </Navbar.Text>
              <Nav.Link href ="/" width="250"> <b>Logout</b></Nav.Link>
              </Navbar.Collapse>
              </Navbar>

            <div className ="tab-wrapper">
            <Tab.Container  defaultActiveKey="details">
                    <div className ="row">
                        <div className="col-sm-3">
                          <Nav  className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="details">Details</Nav.Link><hr/>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="profile">AccessRecord</Nav.Link> <hr/></Nav.Item>                           
                            <Nav.Item><Nav.Link eventKey="uploadRecord">UploadRecord</Nav.Link><hr/></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="access">Grant/Revoke Acccess</Nav.Link><hr/>f
                            </Nav.Item>

                            </Nav> 
                          </div>

                          <div className = "col-sm-9">
                          <h1> Welcome to Medossier</h1>

                            <Tab.Content>
                {/* <Tabs defaultActiveKey="details" id ="uncontrolled-tab-example"> */}
                <Tab.Pane eventKey="details" title ="Details" >
                <Details/>
                </Tab.Pane>
                <Tab.Pane eventKey="profile" title ="AcessRecord" >
                  <Report/>
                </Tab.Pane>

                <Tab.Pane eventKey ="uploadRecord"  title="UploadRecord">
              <Upload/>
             </Tab.Pane>
             <Tab.Pane eventKey="access" title="Grant/Revoke Acccess">
               <Access/>
             </Tab.Pane>
             {/* </Tabs> */}
             </Tab.Content>
            </div> 
 </div>
</Tab.Container>
  </div>
 
</div>
)}
export default Patient;