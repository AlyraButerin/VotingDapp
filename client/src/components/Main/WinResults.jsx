import React from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


function WinResults({ getWinningProposal, winningProposal }) {
  const [winnerToDisplay, setWinnerToDisplay] = useState(null);

  const updateWinnerData = async () => {
    setWinnerToDisplay(winningProposal);
  };

  useEffect(() => {
    updateWinnerData();
  }, [winningProposal]);

  return (
    <Container>
      <Button onClick={getWinningProposal}>Get Winning Proposal</Button>
      {winnerToDisplay ? (
        <div>
          <p>Winner : {winnerToDisplay.description}</p>
          <p>Vote Count : {winnerToDisplay.voteCount}</p>
          <p>Id: {winnerToDisplay.id} </p>
        </div>
      ) : null}
    </Container>

  );
}

export default WinResults;
