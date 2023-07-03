import React from "react";

import { useContext, useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Whitelist from "./Whitelist";
import ProposalsList from "./ProposalsList";
import WinResults from "./WinResults";
import TxContext from "../../contexts/TxContext/TxContext";
import useConnection from "../../contexts/ConnectionContext/useConnection";

/**
 * @dev Displays the results of the vote
 * @dev Displays the details of a proposal
 * @param {*} param0
 *
 * @todo : DON T FORGET TO MAKE READ FUCNTION GENERIC TO (see tx manager)
 */
function ResultsBanner({ getWinningProposal, winningProposal }) {
  const [winnerToDisplay, setWinnerToDisplay] = useState(null);

  const { voteState, connectToVote } = useVote();
  const { wallet } = useConnection();
  const [askedProposalId, setAskedProposalId] = useState("");
  const [askedProposal, setAskedProposal] = useState({
    id: null,
    description: null,
    voteCount: null,
  });

  const [winnerProposal, setWinnerProposal] = useState({
    id: null,
    description: null,
    voteCount: null,
  });


  const updateWinnerData = async () => {
    console.log("updateWinnerData", winnerProposal);
    setWinnerToDisplay(winnerProposal);
  };

  const getProposalDetails = async () => {
    if (askedProposalId === "" || askedProposalId === null) {
      alert("Please enter an id");
      //  setAskedProposalId("");
      return;
    }
    try {
      voteState.contract.methods
        .getOneProposal(askedProposalId)
        .call({ from: wallet.accounts[0] })
        .then((res) => {
          console.log("getOneProposal", res);
          setAskedProposal({
            id: askedProposalId,
            description: res.description,
            voteCount: res.voteCount,
          });
        });
    } catch (err) {
      console.log(
        "getOneProposal/proposal Id not valid or user not a voter",
        err
      );
    }
  };

  const getWinnerProposal = async () => {
    // if (voteState.workflowIndex !== 4) {
    //   alert("Vote is not tallied yet");
    //   return;
    // }
    try {
      const result = await voteState.contract.methods
        .winningProposalID()
        .call({ from: wallet.accounts[0] });

      if (result) {
        voteState.contract.methods
          .getOneProposal(result)
          .call({ from: wallet.accounts[0] })
          .then((res) => {
            console.log("getOneProposal", res);
            setWinnerProposal({
              id: result,
              description: res.description,
              voteCount: res.voteCount,
            });
          });
      }
    } catch (err) {
      console.log("getWinningProposal", err);
    }
  };

  useEffect(() => {
    updateWinnerData();
  }, [winningProposal]);

  //className="vr" u
  return (
    <Container>
      <Row xs={1} md={2}>

        <Col>
          <>
            {voteState.isAdmin ? <Whitelist /> : <div></div>}
            {voteState.isVoter ? <Whitelist /> : <div></div>}
          </>
        </Col>
        <Col>
          <>
            {voteState.isAdmin ? <Whitelist /> : <div></div>}
            {voteState.isVoter ? <Whitelist /> : <div></div>}
          </>
        </Col>
      </Row>

      <Row className="ResultsBanner">
        <center>
          <h5>Results Banner</h5>
        </center>
        <Col className="">
          <button onClick={getWinnerProposal}>Get Winning Proposal</button>
          {/* {winnerToDisplay ? (
          <div>
            <p>Winner : {winnerToDisplay.description}</p>
            <p>Vote Count : {winnerToDisplay.voteCount}</p>
            <p>Id: {winnerToDisplay.id} </p>
          </div>
        ) : null} */}
          <label>Winning Proposal :</label>
          <p>Id: {winningProposal.id}</p>
          <p>Description: {winningProposal.description}</p>
          <p>Vote Count: {winningProposal.voteCount}</p>
        </Col>
        <Col className="">
          <input
            type="number"
            placeholder="Enter a proposal index to get its details :"
            onChange={(e) => setAskedProposalId(e.target.value)}
          />
          <button onClick={getProposalDetails}>Get Proposal Details</button>
          <label>Proposal Details :</label>
          <p>Id: {askedProposal.id}</p>
          <p>Description: {askedProposal.description}</p>
          <p>Vote Count: {askedProposal.voteCount}</p>
        </Col>
      </Row>

    </Container>
  );
}

export default ResultsBanner;
