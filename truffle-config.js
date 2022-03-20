var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "anchor onion once drop elephant cinnamon kite birth champion immense odor almost";

module.exports = {
 networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*"
  },
  ropsten: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/e72dc1a201834e94ab2e55083707eb62");
      },
      network_id: 3,
      gas: 9900000,
      gasPrice: 10000000000,
  },
   rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/db103a7e5ccc4879a174ce6e56135f8d");
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

