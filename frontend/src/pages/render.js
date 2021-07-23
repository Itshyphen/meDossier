import React,{useState ,useEffect} from "react";
import { Switch ,Route ,Router} from "react-router-dom";
import Register from './home';
import getWeb3 from '../getWeb3';
import history from './history';
import Patient from './patients_dashboard';
import DocDashboard from './doctor_dashboard';
import { CONTRACT_ADDRESS, ABI } from "../config.js";
import Verifier from "./registrer_dashboard";
import {useMoralis} from "../moralis/useMoralis"
var CryptoJS = require("crypto-js");

function Render() {
  
 const[currentAccount,setCurrentAccount]= useState('');
 const[contract, setContract] = useState({});
 const[user,setUser] = useState([]);
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

 const {Moralis} = useMoralis();

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
    var timestamp = new Date();
    var nonce = Math.floor(Math.random()*100000);
    Moralis.Web3.getSigningData =()=>"Here I am signing  my one time nonce: "+nonce +" at " +timestamp;
    const user = await Moralis.Web3.authenticate();
    const eth =user.get('ethAddress')
    console.log(eth);
    const currentAccount = eth;
    localStorage.setItem('currentAccount',currentAccount)
    const result = await contract.methods.user(currentAccount).call({from:currentAccount});
    console.log(result);
    if(result==0){
      try{
        console.log("success");
        const registered = await contract.methods.isRegistered(currentAccount).call({from:currentAccount});
        if(registered){
          const doctor = await contract.methods.getDoctorByAddress(currentAccount).call({from:currentAccount});
if(doctor.isApproved==false){
  await contract.methods.doctorLogin().send({from:currentAccount,gas:1000000})

}
        
        // await contract.methods.doctorLogin().send({from:currentAccount,gas:1000000})
        // const doctor = await contract.methods.getDoctorByAddress(currentAccount).call({from:currentAccount});
        setUser(doctor);
        localStorage.setItem('docname',doctor.name)
        localStorage.setItem('faculty',doctor.faculty)
        localStorage.setItem('contact',doctor.contact)
        localStorage.setItem('isApproved',doctor.isApproved)
        localStorage.setItem('license',doctor.licenseno)
        localStorage.setItem('hname',doctor.hname)
        localStorage.setItem('isdoctor','true')

        console.log(doctor)
          history.push('/doctor_dashboard')
        }
        else{
          alert("Your License is not registered! Please register first to access meDossier.")
        }
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
          // getPatientRecord();
         localStorage.setItem('name',patient._name)
        localStorage.setItem('phone',patient._phone)
        localStorage.setItem('dob',patient._dob)
        localStorage.setItem('bloodgroup',patient._bloodgroup)
        localStorage.setItem('gender',patient._gender)
        // localStorage.setItem('ispatient','true')
        localStorage.setItem('ispatient',"true")

        
        // localStorage.setItem('hname',doctor.hname)
  
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
     localStorage.setItem('isUser','true');
      
        history.push('/registration')
  
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

  const encode = (myString) => {
    const encodedWord = CryptoJS.enc.Utf8.parse(myString); // encodedWord Array object
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
}
  const decode = (encoded) => {
    const encodedWord = CryptoJS.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
    const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
    return decoded;
}

  const logout= async () =>{
    localStorage.clear()
    await Moralis.User.logOut();

    history.push('/')
    window.location.reload(false);
    
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

          />
          </Route>
          <Route path ='/patient'>
            <Patient
            patient={user}
            grantAccess ={grantAccess}
            revokeAccess ={revokeAccess}
            logout ={logout}
            encode = {encode}
            decode = {decode}

            // getPatientRecord ={getPatientRecord}
            // records ={records}
            />
          </Route>
          <Route exact path = "/doctor_dashboard">
          <DocDashboard 
          doctor = {user}
          logout ={logout}
          currentAccount ={currentAccount}
          encode = {encode}
          decode = {decode}
          />
          
          
          </Route>
          <Route exact path = "/registration">
          <Verifier 
          owner = {user}
          logout ={logout}

          />
          
          </Route>
          
          </Switch>
          </Router>
  
      // </div>
    )
  }

export default Render