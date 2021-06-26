var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "bullet tube vague brain excuse valley total whale scrap sense water unfold";

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
  }
 }
};