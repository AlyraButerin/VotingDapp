import React, { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import useConnection from "../../contexts/ConnectionContext/useConnection";
import TxContext from "../../contexts/TxContext/TxContext";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function AdminActions({ setIsVoteTallied }) {
  const { initTx, subscribeEvent, addVoter, closeAddVoter } =
    useContext(TxContext);

  const { voteState } = useVote();
  const { wallet } = useConnection();
  const [whiteList, setWhiteList] = useState([]);
  const [newVoter, setNewVoter] = useState("");

  const [disabledButton, setDisabledButton] = useState([
    true,
    true,
    true,
    true,
  ]);

  const handleChange = (e) => {
    setNewVoter(e.target.value);
  };

  const updateWhiteList = (anewVoter) => {
    setWhiteList([...whiteList, anewVoter]);
    console.log("updateWhiteList via callback", anewVoter);
  };
  //checker taille adresse et validite sinon messgae alerte
  //checker pas deja present
  const handleAddVoter = () => {
    let errMsg = null;
    if (newVoter.length !== 42) {
      errMsg = "Please enter a valid address";
    }
    if (whiteList.includes(newVoter)) {
      errMsg = "This address is already in the whitelist";
    }
    if (errMsg) {
      alert(errMsg);
      setNewVoter("");
      return;
    }

    initTx(voteState.contract, "addVoter", newVoter, wallet.accounts[0], {
      callbackFunc: updateWhiteList,
      callbackParam: newVoter,
    });

    // setMove(true);

    subscribeEvent(voteState.contract, "VoterRegistered", true);

    // setWhiteList([...whiteList, newVoter]);
  };

  const handleStartProposal = () => {
    // const params = null;
    initTx(
      voteState.contract,
      "startProposalsRegistering",
      null,
      wallet.accounts[0]
    );
    subscribeEvent(voteState.contract, "WorkflowStatusChange", true);
  };

  const handleEndProposal = () => {
    // const params = null;
    initTx(
      voteState.contract,
      "endProposalsRegistering",
      null,
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

    initTx(voteState.contract, "endVotingSession", params, wallet.accounts[0], {
      callbackFunc: setIsVoteTallied,
      callbackParam: true,
    });
    subscribeEvent(voteState.contract, "WorkflowStatusChange", true);
  };

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

  useEffect(() => {
    const newDisabledButton = [true, true, true, true];
    newDisabledButton[voteState.workflowIndex] = false;
    setDisabledButton(newDisabledButton);
    console.log("useEffect index", voteState.workflowIndex);
  }, [voteState.workflowIndex]);

  return (
    // <div className=" mb-2 ">
    <Container fluid className=" ">
      <div className=" mb-3">
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
          className="m-2"
          type="text"
          placeholder="Enter a new voter address"
          onChange={handleChange}
        />
        <Button onClick={handleAddVoter}>Add voter</Button>
      </div>
      <div>
        <label> </label>
        <Button
          className="m-2"
          onClick={handleStartProposal}
          disabled={disabledButton[0]}
        >
          start proposal registration
        </Button>
        <Button
          className="m-2"
          onClick={handleEndProposal}
          disabled={disabledButton[1]}
        >
          End proposal registration
        </Button>
        <Button
          className="m-2"
          onClick={handleStartVoting}
          disabled={disabledButton[2]}
        >
          Start voting session
        </Button>
        <Button
          className="m-2"
          onClick={handleEndVoting}
          disabled={disabledButton[3]}
        >
          End voting session
        </Button>
      </div>
    </Container>
  );
}

export default AdminActions;
