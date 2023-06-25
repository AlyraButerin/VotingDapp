const { assert, expect } = require("chai");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

const {
  workflow,
  getMockVoters,
  mockStartProposal,
  getProposalByByteSize,
} = require("./Test_VotingHelpers.js");

contract("Voting / Test_03", (accounts) => {
  const { owner, voter1, voter2, voter3, stranger } = getMockVoters(accounts);

  const bigProposal = getProposalByByteSize(41999);
  const tooBigProposal = getProposalByByteSize(42000);

  const curStatusId = 1;
  const nextStatusId = 2;
  const curStatus = workflow[curStatusId];
  const nextStatus = workflow[nextStatusId];

  let votingInstance;

  describe(`${curStatus} status step`, () => {
    before(async () => {
      votingInstance = await mockStartProposal(owner, [voter1, voter2, voter3]);
    });

    describe(`checks that the new ${curStatus} status is valid`, () => {
      it(`checks current status is ${curStatus}`, async function () {
        const status = await votingInstance.workflowStatus.call({
          from: owner,
        });
        expect(status.toNumber()).to.equal(curStatusId);
      });

      it("checks that 'genesis' proposal has been created", async function () {
        const receipt = await votingInstance.getOneProposal(0, {
          from: voter1,
        });
        const proposal = receipt[0];
        expect(proposal).to.equal("GENESIS");
      });
    });

    describe("adding proposal", () => {
      describe("adding one proposal", () => {
        it("should add proposal smaller than 42000 bytes", async function () {
          await votingInstance.addProposal(bigProposal, { from: voter1 });
          const receipt = await votingInstance.getOneProposal(1, {
            from: voter1,
          });
          const proposal = receipt[0];
          expect(proposal).to.equal(bigProposal);
        });

        it("should revert for proposal of 42000 bytes", async function () {
          await expectRevert(
            votingInstance.addProposal(tooBigProposal, { from: voter1 }),
            "Description too long"
          );
        });

        it("should revert for empty proposal", async function () {
          await expectRevert(
            votingInstance.addProposal("", { from: voter1 }),
            "Proposal can t be empty"
          );
        });
      });

      describe("adding proposals", () => {
        const testProposals = [
          //id:0 is the 'genesis' proposal
          //id:1 is the 'bigProposal' proposal
          { id: 2, content: "first proposal", sender: voter1 },
          { id: 3, content: "second proposal", sender: voter2 },
          { id: 4, content: "third proposal", sender: voter3 },
        ];
        testProposals.forEach(function (t) {
          it(`should emit 'ProposalRegistered' event for proposalId${t.id}`, async function () {
            const receipt = await votingInstance.addProposal(t.content, {
              from: t.sender,
            });
            expectEvent(receipt, "ProposalRegistered", {
              proposalId: new BN(t.id),
            });
          });

          it(`it should get '${t.content}' for ID ${t.id}`, async function () {
            const receipt = await votingInstance.getOneProposal(t.id, {
              from: voter1,
            });
            const proposal = receipt[0];
            expect(proposal).to.equal(t.content);
          });
        });
      });
    });

    describe("voter can't set vote", () => {
      it("should revert for voter1", async function () {
        await expectRevert(
          votingInstance.setVote(1, { from: voter1 }),
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

      it("should revert for starting proposals registering", async function () {
        await expectRevert(
          votingInstance.startProposalsRegistering({ from: owner }),
          "Voter registration not open"
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
  describe("change to the next status", () => {
    beforeEach(async () => {
      votingInstance = await mockStartProposal(owner, [voter1, voter2, voter3]);
    });

    it(`checks owner change to ${nextStatus} status`, async function () {
      await votingInstance.endProposalsRegistering({
        from: owner,
      });
      const status = await votingInstance.workflowStatus.call({
        from: owner,
      });
      assert.equal(status, nextStatusId, "status should be changed");
    });

    it(`checks change to ${nextStatus} emit 'WorkflowStatusChange'`, async function () {
      const receipt = await votingInstance.endProposalsRegistering({
        from: owner,
      });
      expectEvent(receipt, "WorkflowStatusChange", {
        previousStatus: new BN(curStatusId),
        newStatus: new BN(nextStatusId),
      });
    });
  });
});
