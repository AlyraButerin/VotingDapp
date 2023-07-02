import { useEffect, useState } from "react";

function ResultsBanner({ getWinningProposal, winningProposal }) {
  const [winnerToDisplay, setWinnerToDisplay] = useState(null);

  const updateWinnerData = async () => {
    setWinnerToDisplay(winningProposal);
  };

  useEffect(() => {
    updateWinnerData();
  }, [winningProposal]);

  return (
    <div className="ResultsBanner">
      <center>
        <h5>Results Banner</h5>
      </center>
      <button onClick={getWinningProposal}>Get Winning Proposal</button>
      {winnerToDisplay ? (
        <div>
          <p>Winner : {winnerToDisplay.description}</p>
          <p>Vote Count : {winnerToDisplay.voteCount}</p>
          <p>Id: {winnerToDisplay.id} </p>
        </div>
      ) : null}
    </div>
  );
}

export default ResultsBanner;
