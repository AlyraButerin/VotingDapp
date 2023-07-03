import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import TxContext from "../../contexts/TxContext/TxContext";
import useConnection from "../../contexts/ConnectionContext/useConnection";

function VoterActions() {
  const { initTx, subscribeEvent, addVoter, closeAddVoter } =
    useContext(TxContext);

  const { voteState } = useVote();
  const { wallet } = useConnection();
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");
  const [votedProposal, setVotedProposal] = useState();
  const [disabledButton, setDisabledButton] = useState([true, true]);

  const handleProposalChange = (e) => {
    setNewProposal(e.target.value);
  };

  const handleVoteChange = (e) => {
    setVotedProposal(e.target.value);
  };
  const updateProposals = (newProposal) => {
    setProposals([...proposals, newProposal]);
    console.log("updateProposals via callback", newProposal);
  };

  const handleAddProposal = () => {
    initTx(voteState.contract, "addProposal", newProposal, wallet.accounts[0], {
      callbackFunc: updateProposals,
      callbackParam: newProposal,
    });

    subscribeEvent(voteState.contract, "ProposalRegistered", true);
  };

  const handleSetVote = () => {
    initTx(voteState.contract, "setVote", votedProposal, wallet.accounts[0]);

    subscribeEvent(voteState.contract, "Voted", true);
  };

  useLayoutEffect(() => {
    const newDisabledButton = [true, true];
    //no === ? perhaps different type => to check later
    if (voteState.workflowIndex == 1) {
      newDisabledButton[0] = false;
    }
    if (voteState.workflowIndex == 3) {
      newDisabledButton[1] = false;
    }
    setDisabledButton(newDisabledButton);
    console.log(
      "useEffect index FIRE IN VOTING",
      voteState.workflowIndex,
      newDisabledButton
    );
  }, [voteState.workflowIndex]);

  return (
    <>
      <div>
        <select>
          {proposals && proposals.length > 0
            ? proposals.map((proposal, index) => (
                <option key={index} value={proposal}>
                  {proposal}
                </option>
              ))
            : null}
        </select>
        <input
          type="text"
          placeholder="Enter a proposal"
          onChange={handleProposalChange}
        />

        <button onClick={handleAddProposal} disabled={disabledButton[0]}>
          Add Proposal
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder="index of Proposal to vote for"
          onChange={handleVoteChange}
        />

        <button onClick={handleSetVote} disabled={disabledButton[1]}>
          Vote
        </button>
      </div>
    </>
  );
}

export default VoterActions;
