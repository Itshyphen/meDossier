
import React from "react";
import {Button,Tab, Card,Navbar,Nav} from "react-bootstrap";
import logo from "./logo.png"
import {Table, TableBody,TableCell,TableContainer,TableHead,TableRow}from "@material-ui/core";
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

function Verifier(props){

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

const Verify = ()=>{
        return(
            <div className="v-container">
            <Card>
            <Card.Title>
                Doctor to be verified
            </Card.Title>
            <p>Doctor Name:</p>
            <p>License Number:</p>
            <p>Hospital Name:</p>
            <Button >Verify</Button>
            </Card>

        </div>
        )
    }
const Doctor =()=>{
    return(
        <div>
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
                        </TableRow>
                    </TableHead>
                    {/* {props.records.map((record,key)=>(  */}

                    <TableBody>

                        <StyledTableRow >
                          <TableCell></TableCell>
                        <TableCell>record.dname</TableCell>
                        <TableCell>record.reason</TableCell>
                        <TableCell>record.visitedDate</TableCell>
                        {/* <TableCell><a href={`https://ipfs.io/ipfs/${record.ipfs}`} target="_blank"> click here to view your record</a></TableCell> */}
                        </StyledTableRow>
                    </TableBody>
                    {/* ))} */}
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
              <Navbar.Text > <b>Welcome </b> </Navbar.Text>
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