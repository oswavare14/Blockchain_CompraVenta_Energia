const Migrations = artifacts.require("Prueba");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
