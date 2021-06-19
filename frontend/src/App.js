// import './App.css';
// import React,{useState ,useEffect} from "react";
// import { Switch ,Route ,Router} from "react-router-dom";
// import Register from './pages/home';
// import {CONTRACT_ADDRESS,ABI } from "./config.js"
// // import getWeb3 from './getWeb3';
// import Web3 from 'web3'
// import history from './pages/history';
// import Patient from './pages/patients_dashboard';
// import WebPage from './pages/pages.js'

// const web3 = new Web3(Web3.givenProvider)
// const contract =  new web3.eth.Contract(ABI,CONTRACT_ADDRESS);

// function App() {

//   const[currentAccount,setCurrentAccount]= useState('');
// //  const[contract, setContract] = useState({});
//  const[patient,setPatient] = useState([]);
//  const getWeb3Data = async()=>{
//    try{
//      //obtain web3 from getWeb3
//     //  const web3 = await getWeb3();
//      //obtain the accounts
//      const accounts = await web3.eth.getAccounts();
//      console.log(accounts);
//      //obtain netwrokID
//     //  const netwrokID = await web3.eth.net.getId();
//     //  console.log(netwrokID);
//     //  const networkdeployed = Contract.networks[netwrokID];
//     //  console.log(networkdeployed);
//     //  const contract = await new web3.eth.Contract(ABI,CONTRACT_ADDRESS);
//      setCurrentAccount(accounts[0]);
//     //  setContract({...instance});
//      //Just to confirm working of addPatient and addDoctor function 
//     //  const patient = await instance.methods.getPatientDetails(accounts[0]).call();
//     //  console.log(patient);
//     //  const doctor = await instance.methods.getDoctorByAddress(accounts[0]).call();
//     //  console.log(doctor);


//    }
//    catch(error){
//      alert("Cannot load web3 ,contract. Consult console for details");
//      console.log(error);
//    }
//  }
//   //Register Patient
//   const patientRegister = async(name,phone,gender,dob,blood)=>{
//     try{
//       console.log(name,phone,gender,dob,blood);
//       console.log(currentAccount)
//       const gas = await contract.methods.addPatient(name,phone,gender,dob,blood).estimateGas()
//       contract.methods.addPatient(name,phone,gender,dob,blood).send({from:currentAccount, gas});
//     }
//     catch(error){
//       console.log(error);
//     }
//   }
//   //Register/Add Doctor
//   const doctorRegister = async(name,hname,contact,faculty)=>{
//     try{
//       await getWeb3Data();
//       console.log(name,contact,faculty);
//       contract.methods.addDoctor(name,hname,contact,faculty).send({from:currentAccount});
      

//     }
// catch(error){
//   console.log(error);
// }
//   }
//   //Handle  patient Login
//   const phandlelogin = async()=>{
//     try{
//       console.log("sucess");
//       const patient = await contract.methods.getPatientDetails(currentAccount).call();
//       setPatient(patient);
//       console.log(patient)
//       // if(patient.length!==0){
//         history.push('/patient')
//       // }
      
//     }
//     catch(error){
//       console.error(error);
//       // alert(error)
//       alert("No records found")
//     }
//   }
// //Patient grant Access to doctor
//   const grantAccess = async(doctor)=>{
//     try{
//        contract.methods.grantAccess(doctor).send({from:currentAccount})
//     }
//     catch(error){
//       console.error(error);
//     }
//   }
//   //Patient revoke access from doctor
//   const revokeAccess = async(doctor)=>{
//     try{
//       contract.methods.revoke_access(doctor).send({from:currentAccount})
//     }
//     catch(error){
//       console.error(error);
//       alert(error);
//     }
//   }
//   //Handle Doctor Login
//   const dhandlelogin = async()=>{
//     try{
//       console.log("doctor");
//     }
//     catch(error){
//       console.log(error);
//     }
//   }
//   useEffect(()=>{
//     getWeb3Data();
//   },[]);
//   return (
    
//       <div className ="App">
//         <Router history={history}>
//         <Switch>
//           <Route path ='/' exact>
//           <Register
//           patientRegister={patientRegister}
//           doctorRegister ={doctorRegister}
//           phandlelogin ={phandlelogin}
//           dhandlelogin ={dhandlelogin}
//           />
//           </Route>
//           <Route path ='/patient'>
//             <Patient
//             patient={patient}
//             grantAccess ={grantAccess}
//             revokeAccess ={revokeAccess}/>
//           </Route>
          
//           </Switch>
//           </Router>
//           {/* <WebPage /> */}
  
//       </div>
//     )}

// export default App;


import './App.css';
import WebPage from './pages/pages';


function App() {
  return (
    <div className="App">
      <WebPage />    
    </div>
  );
}

export default App;