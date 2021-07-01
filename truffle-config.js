<<<<<<< HEAD
const path  = require("path");
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
   contracts_build_directory: path.join(__dirname, "frontend/src/contracts"),
  networks: {
        develop :{
          port : 8545
        }
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.4"  // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  // db: {
  //   enabled: false
  // }
};


// var HDWalletProvider = require("truffle-hdwallet-provider");
// var mnemonic = "bullet tube vague brain excuse valley total whale scrap sense water unfold";

// module.exports = {
//  networks: {
//   development: {
//    host: "127.0.0.1",
//    port: 8545,
//    network_id: "*"
//   },
//   ropsten: {
//       provider: function() { 
//        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/e72dc1a201834e94ab2e55083707eb62");
//       },
//       network_id: 3,
//       gas: 4500000,
//       gasPrice: 10000000000,
//   }
//  },
//  compilers:{
//    solc:{
//      version:'^0.8.4',
//    }
//  }
// };
=======
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
  }
 }
};
>>>>>>> third
