import * as fs from "fs";
import Web3 from "web3";

const abi =  JSON.parse(fs.readFileSync("./build/contracts/Voting.abi.json", "utf8"));
const networkId = "5777";
const contractAddress = /*addressを手動でコピーしてここにペーストしてください。 */;

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const votingContract = new web3.eth.Contract(abi, contractAddress);

async function fetchCandidateList() {
    const candidateList = [];
    const candidateCount = await votingContract.methods.getCandidateCount().call();

    for (let i = 0; i < candidateCount; i++) {
        const candidateName = await votingContract.methods.candidateList(i).call();
        candidateList.push(web3.utils.hexToAscii(candidateName).replace(/\u0000/g, ''));
    }

    return candidateList;
}

async function renderCandidateList() {
    const candidateList = await fetchCandidateList();
    const candidatesDiv = document.getElementById("candidates");

    candidateList.forEach((candidate) => {
        const candidateElement = document.createElement("div");
        candidateElement.innerHTML = `
            <p>${candidate}</p>
            <button onclick="voteForCandidate('${candidate}')">Vote</button>
        `;
        candidatesDiv.appendChild(candidateElement);
    });
}

async function voteForCandidate(candidate) {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        await votingContract.methods.vote(web3.utils.asciiToHex(candidate)).send({ from: sender });
        console.log("Vote submitted successfully!");
    } catch (error) {
        console.error("An error occurred while submitting the vote: ", error);
    }
}

renderCandidateList();