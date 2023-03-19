const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    const candidates = [
        web3.utils.asciiToHex("Candidate 1"),
        web3.utils.asciiToHex("Candidate 2"),
        web3.utils.asciiToHex("Candidate 3"),
    ];
    deployer.deploy(Voting, candidates);
};