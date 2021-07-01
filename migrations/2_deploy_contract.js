const MeDossier = artifacts.require("meDossier");

module.exports = function (deployer) {
  deployer.deploy(MeDossier);
};