var meDossier= artifacts.require("./Medossier.sol");

module.exports = function(deployer) {
  deployer.deploy(meDossier);
};