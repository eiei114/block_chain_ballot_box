const VotingContract = artifacts.require("Voting");
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');
const web3 = new Web3();

contract("VotingContract", accounts => {
    const candidates = [
        web3.utils.asciiToHex("Candidate 1"),
        web3.utils.asciiToHex("Candidate 2"),
        web3.utils.asciiToHex("Candidate 3"),
    ];

    it("should allow a user to cast a vote", async () => {
        const votingInstance = await VotingContract.deployed();
        const voter = accounts[0];
        const candidate = web3.utils.asciiToHex("Candidate 1");

        // Vote for the candidate
        await votingInstance.vote(candidate, { from: voter });

        // Check if the vote was registered
        const voteCount = await votingInstance.votesReceived(candidate);
        assert.equal(voteCount.toNumber(), 1, "The vote was not registered correctly");
    });
});