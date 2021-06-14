import './App.css';
import React,{useState ,useEffect} from "react";
import { Switch ,Route ,BrowserRouter} from "react-router-dom";
import Register from './pages/home';
import Contract from "./contracts/Medossier.json"
import getWeb3 from './getWeb3';
function App() {
 const[currentAccount,setCurrentAccount]= useState('');
 const[contract, setContract] = useState({});
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
     const patient = await instance.methods.getPatientDetails(accounts[0]).call();
     console.log(patient);
     const doctor = await instance.methods.getDoctorByAddress(accounts[0]).call();
     console.log(doctor);


   }
   catch(error){
     alert("Cannot load web3 ,contract. Consult console for details");
     console.log(error);
   }
 }

  const patientRegister = async(name,phone,gender,dob,blood)=>{
    try{
      console.log(name,phone,gender,dob,blood);
      contract.methods.addPatient(name,phone,gender,dob,blood).send({from:currentAccount});
    }
    catch(error){
      console.log(error);
    }
  }
  const doctorRegister = async(name,contact,faculty)=>{
    try{
      console.log(name,contact,faculty);
      contract.methods.addDoctor(name,contact,faculty).send({from:currentAccount});
      await getWeb3Data();

    }
catch(error){
  console.log(error);
}
  }
  useEffect(()=>{
    getWeb3Data();
  },[]);
  return (
    
      <div className ="Main">
        <BrowserRouter>
        <Switch>
          <Route path ='/' exact>
          <Register
          patientRegister={patientRegister}
          doctorRegister ={doctorRegister}
          />
          </Route>
          
          {/* <Route path ="/upload">
            <Upload
            sethash={sethash}
            gethash ={gethash}
            />
          </Route>
          <Route path ="/doctor">
            <Doctor
            patient ={patient}
            />
          </Route> */}
          
          </Switch>
          </BrowserRouter>
  
      </div>
    )}

export default App;
