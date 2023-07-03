import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Whitelist from './Whitelist';
import ProposalsList from './ProposalsList';
import WinResults from './WinResults';


function ResultsBanner({ getWinningProposal, winningProposal }) {
  const [winnerToDisplay, setWinnerToDisplay] = useState(null);
  const { voteState } = useVote();

  const updateWinnerData = async () => {
    setWinnerToDisplay(winningProposal);
  };

  useEffect(() => {
    updateWinnerData();
  }, [winningProposal]);

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
      
    </Container>
  );
}

export default ResultsBanner;
