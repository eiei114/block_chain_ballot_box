// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Voting {
    mapping(bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;

    constructor(bytes32[] memory candidateNames) {
        candidateList = candidateNames;
    }

    function vote(bytes32 candidate) public {
        require(validCandidate(candidate), "Invalid candidate.");
        votesReceived[candidate] += 1;
    }

    function validCandidate(bytes32 candidate) internal view returns (bool) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }

    function votesForCandidate(bytes32 candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Invalid candidate.");
        return votesReceived[candidate];
    }
}