const { assert, expect } = require("chai");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

const {
  workflow,
  getMockVoters,
  mockStartVoting,
} = require("./Test_VotingHelpers.js");

contract("Voting / Test_05", (accounts) => {
  const {
    owner,
    voter1,
    voter2,
    voter3,
    voter4,
    voter5,
    voter6,
    voter7,
    voter8,
    stranger,
  } = getMockVoters(accounts);

  const voters = [
    voter1,
    voter2,
    voter3,
    voter4,
    voter5,
    voter6,
    voter7,
    voter8,
  ];

  const curStatusId = 3;
  const nextStatusId = 4;
  const curStatus = workflow[curStatusId]; //VotingSessionStarted
  const nextStatus = workflow[nextStatusId]; //VotingEndedAndTallied

  const nonExistingProposalId = 10;
  let votingInstance;

  describe(`Voting session`, () => {
    beforeEach(async () => {
      votingInstance = await mockStartVoting(votingInstance, owner, voters);
    });

    describe(`checks that the ${curStatus} status is valid`, () => {
      it(`checks status is ${curStatus}`, async function () {
        const status = await votingInstance.workflowStatus.call({
          from: owner,
        });
        expect(status.toNumber()).to.equal(curStatusId);
      });
    });
    describe("there's no vote before scenario", () => {
      const testProposals = [0, 1, 2, 3];
      testProposals.forEach(function (t) {
        it(`checks that the ${t} proposal has no vote`, async function () {
          const proposal = await votingInstance.getOneProposal(t, {
            from: voter1,
          });
          expect(proposal.voteCount).to.be.bignumber.equal(new BN(0));
        });
      });
    });
    describe("no voter has voted before scenario", () => {
      voters.forEach(function (currentVoter) {
        it(`checks that the ${currentVoter} has no voted proposal`, async function () {
          const voterData = await votingInstance.getVoter(currentVoter, {
            from: currentVoter,
          });
          expect(voterData.hasVoted).to.be.false;
        });
      });
    });
  });
  describe("the behaviour of winningId state during Voting session", () => {
    before(async () => {
      votingInstance = await mockStartVoting(votingInstance, owner, voters);
    });

    const scenario = [
      { voter: voter1, proposalId: 1, updatedWinningId: 1 },
      { voter: voter2, proposalId: 2, updatedWinningId: 1 },
      { voter: voter3, proposalId: 2, updatedWinningId: 2 },
      { voter: voter4, proposalId: 3, updatedWinningId: 2 },
      { voter: voter5, proposalId: 3, updatedWinningId: 2 },
      { voter: voter6, proposalId: 3, updatedWinningId: 3 },
      { voter: voter7, proposalId: 2, updatedWinningId: 3 },
      { voter: voter8, proposalId: 2, updatedWinningId: 2 },
    ];
    scenario.forEach(function (s) {
      it(`checks that winningId is set to ${s.updatedWinningId} after vote of ${s.voter} `, async () => {
        await votingInstance.setVote(s.proposalId, {
          from: s.voter,
        });

        let winningId = await votingInstance.winningProposalID();
        expect(winningId).to.be.bignumber.equal(new BN(s.updatedWinningId));
      });
    });
  });
  describe("the behaviour of winningId state in case of equality", () => {
    before(async () => {
      votingInstance = await mockStartVoting(votingInstance, owner, voters);
    });
    const scenario = [
      { voter: voter1, proposalId: 1, updatedWinningId: 1 },
      { voter: voter2, proposalId: 2, updatedWinningId: 1 },
      { voter: voter3, proposalId: 3, updatedWinningId: 1 },
      { voter: voter4, proposalId: 2, updatedWinningId: 2 },
      { voter: voter5, proposalId: 3, updatedWinningId: 2 },
      { voter: voter6, proposalId: 3, updatedWinningId: 3 },
      { voter: voter7, proposalId: 1, updatedWinningId: 3 },
      { voter: voter8, proposalId: 1, updatedWinningId: 3 },
    ];
    scenario.forEach(function (s) {
      it(`checks that winningId is set to ${s.updatedWinningId} after vote of ${s.voter} `, async () => {
        await votingInstance.setVote(s.proposalId, {
          from: s.voter,
        });

        let winningId = await votingInstance.winningProposalID();
        expect(winningId).to.be.bignumber.equal(new BN(s.updatedWinningId));
      });
    });
  });
  describe("the behaviour of winningId when every voter vote for the same Id", () => {
    before(async () => {
      votingInstance = await mockStartVoting(votingInstance, owner, voters);
    });

    const scenario = [
      { voter: voter1, proposalId: 1, updatedWinningId: 1 },
      { voter: voter2, proposalId: 1, updatedWinningId: 1 },
      { voter: voter3, proposalId: 1, updatedWinningId: 1 },
      { voter: voter4, proposalId: 1, updatedWinningId: 1 },
      { voter: voter5, proposalId: 1, updatedWinningId: 1 },
      { voter: voter6, proposalId: 1, updatedWinningId: 1 },
      { voter: voter7, proposalId: 1, updatedWinningId: 1 },
      { voter: voter8, proposalId: 1, updatedWinningId: 1 },
    ];
    scenario.forEach(function (s) {
      it(`checks that winningId is set to ${s.updatedWinningId} after vote of ${s.voter} `, async () => {
        await votingInstance.setVote(s.proposalId, {
          from: s.voter,
        });

        let winningId = await votingInstance.winningProposalID();
        expect(winningId).to.be.bignumber.equal(new BN(s.updatedWinningId));
      });
    });

    describe("change to the next status, session is closed", () => {
      it(`checks owner change to ${nextStatus} status`, async function () {
        const receipt = await votingInstance.endVotingSession({
          from: owner,
        });
        const status = await votingInstance.workflowStatus.call({
          from: owner,
        });
        assert.equal(status, nextStatusId, "status should be changed");
      });
      describe("voters can't do these actions after vote", () => {
        it("should revert for voter1 adding proposal", async function () {
          await expectRevert(
            votingInstance.addProposal("new proposal", { from: voter1 }),
            "Proposals are not allowed yet"
          );
        });
        it("should revert for voter1 voting when session is closed", async function () {
          await expectRevert(
            votingInstance.setVote(1, {
              from: voter1,
            }),
            "Voting session not open"
          );
        });
      });
      describe("owner can't do these actions", () => {
        it("should revert for adding Voter", async function () {
          await expectRevert(
            votingInstance.addVoter(stranger, { from: owner }),
            "Voters registration is not open"
          );
        });

        it("should revert for startProposalsRegistering", async function () {
          await expectRevert(
            votingInstance.startProposalsRegistering({ from: owner }),
            "Voter registration not open"
          );
        });
        it(`should revert for endProposalsRegistering`, async function () {
          await expectRevert(
            votingInstance.endProposalsRegistering(),
            "Proposal registration not open"
          );
        });

        it(`should revert for startVotingSession`, async function () {
          await expectRevert(
            votingInstance.startVotingSession({ from: owner }),
            "Proposal registration not closed"
          );
        });

        it(`should revert for endVotingSession`, async function () {
          await expectRevert(
            votingInstance.endVotingSession({ from: owner }),
            "Voting session has not started"
          );
        });
      });
    });
  });
});
