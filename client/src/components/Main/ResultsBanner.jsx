import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
    <Container style = {{height:"350px"}}>
      <Row xs={1} md={2}>
      <Col>
      <>
      {voteState.isAdmin ? <Whitelist /> : <div></div>} 
      {voteState.isVoter ? <ProposalsList /> : <div></div>} 
      </>
      </Col>
      <Col>
      <>
      {voteState.isAdmin ? <ProposalsList /> : <div></div>} 
      {voteState.isVoter ? <WinResults /> : <div></div>} 
      </>
      </Col>
      </Row>
      
    </Container>
  );
}

export default ResultsBanner;
