# meDossier : A Decentralized Medical Record Storage
---
![Main Menu](https://raw.githubusercontent.com/Itshyphen/meDossier/master/Screenshots/Frontpage.png)
“meDossier” is a proposed blockchain-based web app to assist secure and transparent medical report management integrating the system with the IPFS (InterPlanetary File System) server. The main objective of our proposal is to enable decentralized access control for medical records between a patient and a doctor, along with interacting with various other entities. This app is based on the Ethereum-based blockchain architecture implemented using a simple frontend.

## How does  ‘meDossier’ work?
- Patients and doctors can add their details to the blockchain. The doctor should be verified by a government authority to be able to use meDossier as a doctor.

- Whenever the patient visits a doctor, the doctor sends the request for access to the patient and can access or upload the patient’s medical report with the help of the IPFS after the patient approves of the request access.

- The hash value of the patient’s medical record with the storage in IPFS is stored in a smart contract in an encrypted form.

## Modules:

A patient is able to do following functions:
- Register to the app
- Add reports along with details about visiting hospital
- Can give and revoke access from the doctors
- View their records

A doctor is able to do following things:
- Register to the app
- Can use the app only if their license is registered
- Access and add the records of their patients if they are accessed by patient

The registration office is able to do the following thing:
- Register Doctors’ license
- Access registered doctors details

## Tools and Technologies Used

- Solidity : Language used to write Smart Contract
- [Remix IDE](https://remix.ethereum.org) :Code, Test and Deploy Smart Contract
- Add Metamask extension to browser
- Install [Truffle](https://www.trufflesuite.com/) to create dapp easily
- Ganache: Deploy smart contract locally
- Web3
- [Infura](https://infura.io/): Create an account and deploy smart contract on testnets
- ReactJS for frontend


## Development
> You should have already installed node 10+ and npm 6.8+

> Installed metamask in your favourite browser


Open your favorite Terminal and run these commands.

```sh
git clone https://github.com/Itshyphen/meDossier
```


```sh
cd Frontend
```

```sh
npm install
```

```sh
npm start
```
## Addresses For Different Users
> Deployment Network: Rinkeby Test Network
> Private Key: bedb1616a05f28663cd9ec9c951c7e7828ec06e0632aa5c3837b48e712bebc46
> Public Key: 0xbb9C5905037d329a87cC7aF3f6f69B6D70Eb51F8

> Registration office login: Import above private key to your metamask and use that to log in.

> Patient Login: You can simply register with any account

> Doctor Login: Register as a doctor with any account, and verify the license number by logging in into Registration Office.

## Demo
Live Demo: [meDossier](http://medossier.netlify.app)




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
