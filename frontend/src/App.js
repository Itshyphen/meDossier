import './App.css';
import React,{useState ,useEffect} from "react";
import { Switch ,Route ,Router} from "react-router-dom";
import Register from './pages/home';
import Contract from "./contracts/Medossier.json"
import getWeb3 from './getWeb3';
import history from './pages/history';
import Patient from './pages/patients_dashboard';
function App() {
 const[currentAccount,setCurrentAccount]= useState('');
 const[contract, setContract] = useState({});
 const[patient,setPatient] = useState([]);
 const[records,setRecords] = useState([]);

 const getWeb3Data = async()=>{
   try{
     //obtain web3 from getWeb3
     const web3 = await getWeb3();
     //obtain the accounts
     const accounts = await web3.eth.getAccounts();
     console.log(accounts);
     //obtain netwrokID
     const netwrokID = await web3.eth.net.getId();
     console.log(netwrokID);
     const networkdeployed = Contract.networks[netwrokID];
     console.log(networkdeployed);
     const instance = await new web3.eth.Contract(Contract.abi,networkdeployed && networkdeployed.address);
     setCurrentAccount(accounts[0]);
     setContract({...instance});
     //Just to confirm working of addPatient and addDoctor function 
    //  const patient = await instance.methods.getPatientDetails(accounts[0]).call();
    //  console.log(patient);
    //  const doctor = await instance.methods.getDoctorByAddress(accounts[0]).call();
    //  console.log(doctor);
    // const recordlength =  await instance.methods.getrecordlist(accounts[0]).call();
    // console.log(recordlength)
    //   const recordlist =[];
    //   for (const i =1 ;i<= recordlength; i++){
    //     const record = await  instance.methods.getPatientRecords(accounts[0],i).call();
    //     recordlist.push(record);
    //     console.log(recordlist);
    //   }
    //   setRecords(recordlist);

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
      contract.methods.addPatient(name,phone,gender,dob,blood).send({from:currentAccount});
    }
    catch(error){
      console.log(error);
    }
  }
  //Register/Add Doctor
  const doctorRegister = async(name,hname,contact,faculty)=>{
    try{
      console.log(name,contact,faculty);
      contract.methods.addDoctor(name,hname,contact,faculty).send({from:currentAccount});
      await getWeb3Data();

    }
catch(error){
  console.log(error);
}
  }
  //Handle  patient Login
  const phandlelogin = async()=>{
    try{
      console.log("sucess");
      const patient = await contract.methods.getPatientDetails(currentAccount).call();
      setPatient(patient);
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
//Patient grant Access to doctor
  const grantAccess = async(doctor)=>{
    try{
       contract.methods.grantAccess(doctor).send({from:currentAccount})
    }
    catch(error){
      console.error(error);
    }
  }
  //Patient revoke access from doctor
  const revokeAccess = async(doctor)=>{
    try{
      contract.methods.revoke_access(doctor).send({from:currentAccount})
    }
    catch(error){
      console.error(error);
      alert(error);
    }
  }
//Get Patient details by patient
  const getPatientRecord = async()=>{
    try{
      const recordlength =  await contract.methods.getrecordlist(currentAccount).call();
      const recordlist =[];
      for (let i =0 ;i< recordlength; i++){
        const record = await  contract.methods.getPatientRecords(currentAccount,i).call();
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
      console.log("doctor");
    }
    catch(error){
      console.log(error);
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
          phandlelogin ={phandlelogin}
          dhandlelogin ={dhandlelogin}

          />
          </Route>
          <Route path ='/patient'>
            <Patient
            patient={patient}
            grantAccess ={grantAccess}
            revokeAccess ={revokeAccess}
            contract ={contract}
            currentAccount ={currentAccount}
            getPatientRecord ={getPatientRecord}
            records ={records}
            />
          </Route>
          </Switch>
          </Router>
  
      // </div>
    )}

export default App;
