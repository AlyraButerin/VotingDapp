import { useEffect, useState, useLayoutEffect } from "react";
import VotesBanner from "./VotesBanner";
import ActionsBanner from "./ActionsBanner";
import ResultsBanner from "./ResultsBanner";
import useVote from "../../contexts/VoteContext/useVote";
import useConnection from "../../contexts/ConnectionContext/useConnection";
// import AddressList from "./AddressList";

/*
@dev :  Main component
@notice : 
@todo : CREATE COMPONENT TO DISPLAY INFOS AND ALERTS
@todo : REFACTORING
*/
function Main() {
  const { wallet, hasProvider, handleConnect } = useConnection();
  const { voteState, connectToVote } = useVote();

  // const [deployedAddresses, setDeployedAddresses] = useState([]);
  // const [select, setSelect] = useState(null);
  const [isVoteTallied, setIsVoteTallied] = useState(false);
  const [winningProposal, setWinningProposal] = useState({
    id: null,
    description: null,
    voteCount: null,
  });

  // /**
  //  * @dev :  handleSelectVote
  //  * @todo : dirty fix for default add not loading => manage the first state of select!!!!
  //  */
  // const handleSelectVote = () => {
  //   console.log("handleSelectVote", select);
  //   console.log("handleSelectVote", voteState.deployedAddresses);
  //   if (select === null && voteState.deployedAddresses.length > 0) {
  //     connectToVote(voteState.deployedAddresses[0]);
  //   } else {
  //     connectToVote(select);
  //   }
  // };

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

  // /*
  // @dev : set deployedAddresses and select when voteState.deployedAddresses change
  // */
  // useEffect(() => {
  //   setDeployedAddresses(voteState.deployedAddresses);
  //   if (select === null && voteState.deployedAddresses.length > 0) {
  //     setSelect(voteState.deployedAddresses[0]);
  //   }
  // }, [voteState.deployedAddresses]);

  // /*
  // @todo : REMOVE AT THE END
  // */
  // const afficheVote = () => {
  //   console.log("(index/Main)/voteState", voteState);
  // };

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
    // INTEGRER UN ALERT POUR METAMASK UNINSTALLED
    <div className="Connection" style = {{backgroundColor: "#dce9ef", border: "0.5px solid white"}}>
      {hasProvider ? (
        window.ethereum?.isMetaMask && wallet?.accounts.length < 1 ? (
          <Button onClick={handleConnect}>Connect MetaMask</Button>
        ) : wallet != null ? (
          wallet?.accounts.length > 0 && (
            <>
              <VotesBanner />
              {/* @todo : TEMPORARY CODE, USE A NEW COMPONENT INSTEAD */}
              {/* <label>
                DeployedAddess: */}
              {/* <select
                  onChange={(e) => {
                    const address = voteState.deployedAddresses.find(
                      (address) => address === e.target.value
                    );
                    setSelect(address);
                  }}
                >
                  {voteState?.deployedAddresses.length > 0
                    ? voteState?.deployedAddresses.map((address, index) => (
                        <option key={index} value={address}>
                          {address}
                        </option>
                      ))
                    : null}
                </select> */}
              {/* <select
                  onChange={(e) => {
                    const address = deployedAddresses.find(
                      (address) => address === e.target.value
                    );
                    setSelect(address);
                  }}
                >
                  {deployedAddresses.length > 0
                    ? deployedAddresses.map((address, index) => (
                        <option key={index} value={address}>
                          {address}
                        </option>
                      ))
                    : null}
                </select> */}
              {/* @todo : TEMPORARY CODE, USE A NEW COMPONENT INSTEAD */}
              {/* <button onClick={handleSelectVote}>Connect to Vote</button> */}
              {/* <button onClick={handleDisconnect}>Disconnect/return</button> */}
              {/* </label> */}
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
    </div>
  );
}

export default Main;
