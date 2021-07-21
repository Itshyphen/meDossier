# meDossier-1
MeDossier is a proposed blockchain-based web app to assist secure and transparent medical report management integrating the system with the IPFS (InterPlanetary File System) server. 
The main objective of our proposal is to enable decentralized access control for medical records between a patient and a doctor, along with interacting with various other entities. Similarly ,we have used Moralis (-a serveless platfrom to deploy web3 app) for authentication of the etherum address.

<h2>Workflow of the Project:</h2>

Patients and doctors can add their details to the blockchain. The doctor should be verified by a government authority to be able to use meDossier as a doctor.

Whenever the patient visits a doctor, the doctor sends the request for access to the patient and can access or upload the patient’s medical report with the help of the IPFS after the patient approves of the request access.

The hash value of the patient’s medical record with the storage in IPFS is stored in a smart contract in an encrypted form.


<h1>Live Demo</h1>
https://medossier.netlify.app/
<br/>
You should have metamask wallet with Rinkeby testnet setup to use meDossier

<h1>Guidelines for setup </h1>
Assuming truffle and ganache are already installed in your local computer and Metamask extension is added in the browser 
<li>
yarn install will install all the requirements.
<br/>
<li>
cd frontend, yarn install and yarn start will run the app. Ensure metamask is connected in the rinkeby testnet.
