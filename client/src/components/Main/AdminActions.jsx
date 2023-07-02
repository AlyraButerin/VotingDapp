import React, { useEffect, useState } from "react";
import useVote from '../../contexts/VoteContext/useVote';
import useConnection from '../../contexts/ConnectionContext/useConnection';
import TxContext from '../../contexts/TxContext/TxContext';
import { useContext } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import Button  from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function AdminActions() {
  const { initTx, subscribeEvent, addVoter, closeAddVoter } =
    useContext(TxContext);

  const { voteState } = useVote();
  const { wallet } = useConnection();
  const [whiteList, setWhiteList] = useState([]);
  const [newVoter, setNewVoter] = useState("");

  const handleChange = (e) => {
    setNewVoter(e.target.value);
  };

  //checker taille adresse et validite sinon messgae alerte
  //checker pas deja present
  const handleAddVoter = () => {
    if (newVoter.length !== 42) {
      alert("Please enter a valid address");
      setNewVoter("");
      return;
    }
    if (whiteList.includes(newVoter)) {
      alert("This address is already in the whitelist");
      setNewVoter("");
      return;
    }

    initTx(voteState.contract, "AddVoter", newVoter, wallet.accounts[0]);

    // setMove(true);

    subscribeEvent(voteState.contract, "VoterRegistered", true);

    setWhiteList([...whiteList, newVoter]);
  };

  const handleStartProposal = () => {
    const params = null;
    initTx(
      voteState.contract,
      "startProposalsRegistering",
      params,
      wallet.accounts[0]
    );
    subscribeEvent(voteState.contract, "WorkflowStatusChange", true);
  };

  const handleEndProposal = () => {
    const params = null;
    initTx(
      voteState.contract,
      "endProposalsRegistering",
      params,
      wallet.accounts[0]
    );
    subscribeEvent(voteState.contract, "WorkflowStatusChange", true);
  };

  const handleStartVoting = () => {
    const params = null;
    initTx(
      voteState.contract,
      "startVotingSession",
      params,
      wallet.accounts[0]
    );
    subscribeEvent(voteState.contract, "WorkflowStatusChange", true);
  };

  const handleEndVoting = () => {
    const params = null;
    initTx(voteState.contract, "endVotingSession", params, wallet.accounts[0]);
    subscribeEvent(voteState.contract, "WorkflowStatusChange", true);
  };
  /*
  //checker taille adresse et validite sinon messgae alerte
  //checker pas deja present
  const handleAddVoter = async () => {
    if (newVoter.length !== 42) {
      alert("Please enter a valid address");
      setNewVoter("");
      return;
    }
    if (whiteList.includes(newVoter)) {
      alert("This address is already in the whitelist");
      setNewVoter("");
      return;
    }
    const receipt = await voteState.contract.methods
      .addVoter(newVoter)
      .send({ from: wallet.accounts[0] })
      .on("transactionHash", function (hash) {
        console.log("ADDVOTER, txhash", hash);
      })
      .on("receipt", function (receipt) {
        console.log("ADDVOTER, receipt", receipt);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log("ADDVOTER, confirmation", confirmationNumber, receipt);
      })
      .on("error", function (error, receipt) {
        console.log("ADDVOTER, error", error);
        console.log("ADDVOTER, receipt", receipt);
      });
    console.log("ADDVOTER TX END, receipt", receipt);
    setWhiteList([...whiteList, newVoter]);
  };
  */

  //rempli whitelist avec les adresses du contract en cherchant dans les events
  useEffect(() => {
    const getWhiteList = async () => {
      const list = await voteState.contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const addresses = list.map((event) => event.returnValues.voterAddress);
      setWhiteList(addresses);
    };
    getWhiteList();
  }, [voteState.contract]);

  return ( 
    <div className="bg-body-tertiary">
      AdminActions
      <div>
        <select>
          {whiteList && whiteList.length > 0
            ? whiteList.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))
            : null}
        </select>
        <input
          type="text"
          placeholder="Enter a new voter address"
          onChange={handleChange}
        />
        <button onClick={handleAddVoter}>Add voter</button>
      </div>
      <div>
        workflow
        <button onClick={handleStartProposal}>
          start proposal registration
        </button>
        <button onClick={handleEndProposal}>End proposal registration</button>
        <button onClick={handleStartVoting}>Start voting session</button>
        <button onClick={handleEndVoting}>End voting session</button>
      </div>
    </div>
         
  );
}

export default AdminActions;
