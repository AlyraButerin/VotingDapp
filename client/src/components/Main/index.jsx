import { useEffect, useState } from "react";
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

  const [deployedAddresses, setDeployedAddresses] = useState([]);
  const [select, setSelect] = useState(null);

  /*
  @dev :  handleSelectVote
  */
  const handleSelectVote = () => {
    console.log("handleSelectVote", select);
    connectToVote(select);
  };

  /*
  @dev : set deployedAddresses and select when voteState.deployedAddresses change
  */
  useEffect(() => {
    setDeployedAddresses(voteState.deployedAddresses);
    if (select === null && voteState.deployedAddresses.length > 0) {
      setSelect(voteState.deployedAddresses[0]);
    }
  }, [voteState.deployedAddresses]);

  /*
  @todo : REMOVE AT THE END
  */
  const afficheVote = () => {
    console.log("(index/Main)/voteState", voteState);
  };

  /*
  @dev : watcher on voteState changes
  @todo : REMOVE AT THE END
  */
  useEffect(() => {
    console.log("(index/Main)/useEffect voteState", voteState);
  }, [voteState]);

  return (
    // INTEGRER UN ALERT POUR METAMASK UNINSTALLED
    <div className="Connection">
      {hasProvider ? (
        window.ethereum?.isMetaMask && wallet?.accounts.length < 1 ? (
          <button onClick={handleConnect}>Connect MetaMask</button>
        ) : wallet != null ? (
          wallet?.accounts.length > 0 && (
            <>
              <VotesBanner />
              {/* @todo : TEMPORARY CODE, USE A NEW COMPONENT INSTEAD */}
              <label>
                DeployedAddess:
                <select
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
                </select>
                {/* @todo : TEMPORARY CODE, USE A NEW COMPONENT INSTEAD */}
                <button onClick={handleSelectVote}>Select</button>
              </label>
              <ActionsBanner />
              <ResultsBanner />
              {/* @todo : REMOVE DEMO INFOS */}
              <label>Wallet Accounts: {wallet?.accounts[0]}</label>
              <label>Wallet Balance: {wallet?.balance}</label> {/* New */}
              <label>Hex ChainId: {wallet?.chainId}</label> {/* New */}
              <label>Numeric ChainId: {wallet?.chainId}</label>{" "}
              {wallet?.chainId !== "0x539" ? (
                <label>Wrong Network</label>
              ) : (
                <label>Ganache Network</label>
              )}
              {/* @todo : REMOVE DEMO INFOS */}
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
