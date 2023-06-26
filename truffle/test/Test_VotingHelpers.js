const Voting = artifacts.require("Voting");

const [
  ownerId,
  voterId1,
  voterId2,
  voterId3,
  voterId4,
  voterId5,
  voterId6,
  voterId7,
  voterId8,
  strangerId,
] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//size of ut8 char is 1 byte for simple char and 4 bytes for emoji...
const tenBytes = "0123456789";

function generateStringByByteSize(baseString, byteSize) {
  const baseLength = baseString.length;
  const multiple = Math.floor(byteSize / baseLength);
  const rest = byteSize % baseLength;

  let result = "";
  let i = 0;
  while (i < multiple) {
    result += baseString;
    i++;
  }
  result += baseString.substring(0, rest);
  return result;
}

module.exports = {
  ownerId,
  voterId1,
  voterId2,
  voterId3,
  voterId4,
  voterId5,
  voterId6,
  voterId7,
  voterId8,
  strangerId,
  /*
  due to correction breach, last event 'VotesTallied' is removed
  and 'VotingSessionEnded' is renamed 'VotingEndedAndTallied'
   */
  workflow: [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingEndedAndTallied",
  ],
  proposals: ["first proposal", "second proposal", "third proposal"],
  getMockVoters: (accounts) => {
    return {
      owner: accounts[ownerId],
      voter1: accounts[voterId1],
      voter2: accounts[voterId2],
      voter3: accounts[voterId3],
      voter4: accounts[voterId4],
      voter5: accounts[voterId5],
      voter6: accounts[voterId6],
      voter7: accounts[voterId7],
      voter8: accounts[voterId8],
      stranger: accounts[strangerId],
    };
  },
  mockStartProposal: async (owner, voters) => {
    votingInstance = await Voting.new({ from: owner });

    //forEach cause error due to async, on other computer less powerful
    for (let i = 0; i < voters.length; i++) {
      await votingInstance.addVoter(voters[i], { from: owner });
    }

    await votingInstance.startProposalsRegistering({
      from: owner,
    });
    return votingInstance;
  },
  mockEndProposal: async (votingInstance, owner, voter1, voter2, voter3) => {
    await votingInstance.addProposal("first proposal", {
      from: voter1,
    });
    await votingInstance.addProposal("second proposal", {
      from: voter2,
    });
    await votingInstance.addProposal("third proposal", {
      from: voter3,
    });
    await votingInstance.endProposalsRegistering({ from: owner });
    return votingInstance;
  },
  mockStartVoting: async (votingInstance, owner, voters) => {
    votingInstance = await Voting.new({ from: owner });

    //forEach cause error due to async, tx nonce not valid randomly
    for (let i = 0; i < voters.length; i++) {
      await votingInstance.addVoter(voters[i], { from: owner });
    }

    await votingInstance.startProposalsRegistering({
      from: owner,
    });
    await votingInstance.addProposal("first proposal", {
      from: voters[0],
    });
    await votingInstance.addProposal("second proposal", {
      from: voters[1],
    });
    await votingInstance.addProposal("third proposal", {
      from: voters[2],
    });
    await votingInstance.endProposalsRegistering({ from: owner });
    await votingInstance.startVotingSession({ from: owner });
    return votingInstance;
  },
  getProposalByByteSize: (byteSize) =>
    generateStringByByteSize(tenBytes, byteSize),
};
