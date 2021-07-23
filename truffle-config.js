var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "your metamask mnemonics";

module.exports = {
 networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*"
  },
  ropsten: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "Enter your Infura end point");
      },
      network_id: 3,
      gas: 9900000,
      gasPrice: 10000000000,
  },
   rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "Enter your Infura end point");
      },
      network_id: 4,
      gas: 9900000,
      gasPrice: 10000000000,
  }
 }
};

//configure this file if you are using other network to deploy smart contract
//I have attached the cooresponding smart contract with it, you can re-deploy with your 
//own account, and when you log in through deployer account you will be redirected to 
//admin, who can verify doctors.  

