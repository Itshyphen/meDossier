var meDossier= artifacts.require("./meDossier.sol");

module.exports = function(deployer) {
  deployer.deploy(meDossier);
};