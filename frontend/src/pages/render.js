
import React,{useState ,useEffect} from "react";
import { Switch ,Route ,Router} from "react-router-dom";
import Register from './home';
import getWeb3 from '../getWeb3';
import history from './history';
import Patient from './patients_dashboard';
import DocDashboard from './doctor_dashboard';
import { CONTRACT_ADDRESS, ABI } from "../config.js";
import Verifier from "./registrer_dashboard";


function Render() {
  
 const[currentAccount,setCurrentAccount]= useState('');
 const[contract, setContract] = useState({});
 const[user,setUser] = useState([]);
 const[records,setRecords] = useState([]);

 const getWeb3Data = async()=>{
   try{
      //obtain web3 from getWeb3
      const web3 = await getWeb3();
      //obtain the accounts
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
//initialize contract
      const instance = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      setCurrentAccount(accounts[0]);
      setContract({...instance});
   }
   catch(error){
     alert("Cannot load web3 ,contract. Consult console for details");
     console.log(error);
   }
 }
  //Register Patient
  const patientRegister = async(name,phone,gender,dob,blood)=>{
    try{
      console.log(name,phone,gender,dob,blood);
      console.log(currentAccount);
      await contract.methods.addPatient(name,phone,gender,dob,blood).send({from:currentAccount,gas:1000000});
      // await getWeb3Data();
    }
    catch(error){
      console.log(error);
    }
  }
  //Register/Add Doctor
  const doctorRegister = async(name,hname,contact,faculty,license)=>{
    try{
      console.log(name,hname,contact,faculty);
      const result = await contract.methods.addDoctor(name,hname,contact,faculty,license).send({from:currentAccount,gas:1000000});
      // await getWeb3Data();

    }
catch(error){
  console.log(error);
}
  }
  //Handle  patient Login
  const handlelogin = async()=>{
    const result = await contract.methods.user(currentAccount).call({from:currentAccount});
    console.log(result);
    if(result==0){
      try{
        console.log("success");
        await contract.methods.doctorLogin().send({from:currentAccount,gas:1000000})
        const doctor = await contract.methods.getDoctorByAddress(currentAccount).call({from:currentAccount});
        setUser(doctor);
        console.log(doctor)
          history.push('/doctor_dashboard')
        // }
        
      }
      catch(error){
        console.error(error);
        // alert(error)
        alert("No records found")
      }
    }
    else if(result==1){
      try{
        console.log("sucess");
        const patient = await contract.methods.getPatientDetails(currentAccount).call({from:currentAccount});
        setUser(patient);
        console.log(patient)
        // if(patient.length!==0){
          getPatientRecord();
  
          history.push('/patient')
        // }
        
      }
      catch(error){
        console.error(error);
        // alert(error)
        alert("No records found")
      }
    }
    else if(result==2) {

        history.push('/Registration_office')
  
    }
    else{
      alert("User not registered!")
    }
   
  }
//Patient grant Access to doctor
  const grantAccess = async(doctor)=>{
    try{
      await contract.methods.grantAccess(doctor).send({from:currentAccount,gas:1000000})
    }
    catch(error){
      console.error(error);
    }
  }
  //Patient revoke access from doctor
  const revokeAccess = async(doctor)=>{
    try{
      console.log(doctor)
      await contract.methods.revoke_access(doctor).send({from:currentAccount,gas:1000000})
    }
    catch(error){
      console.error(error);
      alert(error);
    }
  }
//Get Patient details by patient
  const getPatientRecord = async()=>{
    try{
      const recordlength =  await contract.methods.getrecordlist(currentAccount).call({from:currentAccount});
      const recordlist =[];
      for (let i =0 ;i< recordlength; i++){
        const record = await  contract.methods.getPatientRecords(currentAccount,i).call({from:currentAccount});
        console.log(record);

        recordlist.push(record);
      }
      setRecords(recordlist);
      console.log(records)

    }
    catch(error){
     alert(error);
    }
  }
  
  //Handle Doctor Login
  const dhandlelogin = async()=>{
    try{
      console.log("success");
      const doctor = await contract.methods.getDoctorByAddress(currentAccount).call({from:currentAccount});
      setUser(doctor);
      console.log(doctor)
        history.push('/doctor_dashboard')
      // }
      
    }
    catch(error){
      console.error(error);
      // alert(error)
      alert("No records found")
    }
  }
  useEffect(()=>{
    getWeb3Data();
  },[]);
  return (
    
      // <div className ="Main">
        <Router history={history}>
        <Switch>
          <Route path ='/' exact>
          <Register
          patientRegister={patientRegister}
          doctorRegister ={doctorRegister}
          handlelogin ={handlelogin}
          dhandlelogin ={dhandlelogin}

          />
          </Route>
          <Route path ='/patient'>
            <Patient
            patient={user}
            grantAccess ={grantAccess}
            revokeAccess ={revokeAccess}
            contract ={contract}
            currentAccount ={currentAccount}
            getPatientRecord ={getPatientRecord}
            records ={records}
            />
          </Route>
          <Route exact path = "/doctor_dashboard">
          <DocDashboard 
          doctor = {user}
          contract ={contract}
          />
          
          </Route>
          <Route exact path = "/Registration_office">
          <Verifier 
          owner = {user}
          />
          
          </Route>
          
          </Switch>
          </Router>
  
      // </div>
    )
  }

export default Render