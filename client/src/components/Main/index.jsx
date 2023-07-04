import { useEffect, useState, useLayoutEffect } from "react";
import VotesBanner from "./VotesBanner";
import ActionsBanner from "./ActionsBanner";
import ResultsBanner from "./ResultsBanner";
import useVote from "../../contexts/VoteContext/useVote";
import useConnection from "../../contexts/ConnectionContext/useConnection";
import { Button } from "react-bootstrap";
import { Stack, Row, Container } from "react-bootstrap";

/*
@dev :  Main component
@notice : 
@todo : CREATE COMPONENT TO DISPLAY INFOS AND ALERTS
@todo : REFACTORING
*/
function Main() {
  const { wallet, hasProvider, handleConnect } = useConnection();
  const { voteState, connectToVote } = useVote();

  const [isVoteTallied, setIsVoteTallied] = useState(false);
  const [winningProposal, setWinningProposal] = useState({
    id: null,
    description: null,
    voteCount: null,
  });

  /*TO DO choose and clean the flow to update the winner at event reception*/
  const getWinningProposal = async () => {
    const winningProposalId = await voteState.contract.methods
      .winningProposalID()
      .call({ from: wallet.accounts[0] });
    const winningProposal = await voteState.contract.methods
      .getOneProposal(winningProposalId)
      .call({ from: wallet.accounts[0] });
    setWinningProposal({
      id: winningProposalId,
      description: winningProposal.description,
      voteCount: winningProposal.voteCount,
    });
    console.log("winningProposal", winningProposal, winningProposalId);
  };

  /*
  @dev : watcher on voteState changes
  @todo : REMOVE AT THE END
  */
  useEffect(() => {
    console.log("(index/Main)/useEffect voteState", voteState);
  }, [voteState]);

  useLayoutEffect(() => {
    console.log("LAYOUTEFFECT POUR GET WINNER");
    //TEST callback après tallied
    const updateWinningProposal = () => {
      console.log("CALLED FROM CALLBAKC AFTER LAYOUT EFFECT");
      getWinningProposal();
    };
    if (isVoteTallied) {
      updateWinningProposal();
      console.log("LAYOUTEFFECT POUR GET WINNER, IF PASSED");
    }
  }, [isVoteTallied]);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#dce9ef",
        padding: "0",
        margin: "0",
      }}
    >
      {hasProvider ? (
        window.ethereum?.isMetaMask && wallet?.accounts.length < 1 ? (
          <Button onClick={handleConnect}>Connect MetaMask</Button>
        ) : wallet != null ? (
          wallet?.accounts.length > 0 && (
            <>
              <VotesBanner />
              <ActionsBanner setIsVoteTallied={setIsVoteTallied} />
              <ResultsBanner
                winningProposal={winningProposal}
                getWinningProposal={getWinningProposal}
              />
            </>
          )
        ) : null
      ) : (
        <div> PLEASE INSTALL METAMASK</div>
      )}
    </Container>
  );
}

export default Main;
