import React from "react";

import { useContext, useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
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
    <Container style = {{height:"350px"}}>
      <Row className="ResultsBanner">
        <Col className="">
          <Button className="m-2" onClick={getWinnerProposal}>Get Winning Proposal</Button>
          {/* {winnerToDisplay ? (
          <div>
            <p>Winner : {winnerToDisplay.description}</p>
            <p>Vote Count : {winnerToDisplay.voteCount}</p>
            <p>Id: {winnerToDisplay.id} </p>
          </div>
        ) : null} */}
        <div>
          <label>Winning Proposal :</label>
          <p>Id: {winningProposal.id}</p>
          <p>Description: {winningProposal.description}</p>
          <p>Vote Count: {winningProposal.voteCount}</p>
          </div>
        </Col>
        <Col className="">
          <input
            type="number"
            placeholder="Enter a proposal index to get its details :"
            onChange={(e) => setAskedProposalId(e.target.value)}
          />
          <Button className="m-2"  onClick={getProposalDetails}>Get Proposal Details</Button>
          <div>
          <label>Proposal Details :</label>
          <p>Id: {askedProposal.id}</p>
          <p>Description: {askedProposal.description}</p>
          <p>Vote Count: {askedProposal.voteCount}</p>
          </div>
        </Col>
      </Row>

    </Container>
  );
}

export default ResultsBanner;
