import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import useConnection from "../../contexts/ConnectionContext/useConnection";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

function VotesBanner() {
  const { wallet, hasProvider, handleConnect, handleDisconnect } =
    useConnection();
  const { voteState, connectToVote, createVote } = useVote();
  const [deployedAddresses, setDeployedAddresses] = useState([]);
  const [select, setSelect] = useState(null);

  /**
   * @dev :  handleSelectVote
   * @todo : dirty fix for default add not loading => manage the first state of select!!!!
   */
  const handleSelectVote = () => {
    console.log("handleSelectVote", select);
    console.log("handleSelectVote", voteState.deployedAddresses);
    if (select === null && voteState.deployedAddresses.length > 0) {
      connectToVote(voteState.deployedAddresses[0]);
    } else {
      connectToVote(select);
    }
  };

  const handleCreateVote = async () => {
    await createVote();
  };

  const displayRoles = () => {
    let roles = "none";
    if (voteState.isAdmin) {
      roles = "admin, ";
    }
    if (voteState.isVoter) {
      roles = roles != "none" ? roles + "voter" : "voter";
    }
    return roles;
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

  return (
    <Navbar className="bg-body-tertiary">
      <Stack direction="horizontal" gap={5}>
        <Navbar.Text>Select a vote</Navbar.Text>
        <Form.Select
          onChange={(e) => {
            const address = deployedAddresses.find(
              (address) => address === e.target.value
            );
            setSelect(address);
          }}
          style={{ width: "350px" }}
        >
          {deployedAddresses.length > 0
            ? deployedAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))
            : null}
        </Form.Select>
        <Button onClick={handleSelectVote} variant="primary">
          Connecter
        </Button>

        <div className="vr" />
        <Navbar.Text className="justify-content-end">
          Create a new vote
        </Navbar.Text>
        <Button
          onClick={handleCreateVote}
          className="justify-content-end"
          variant="warning"
        >
          Deploy
        </Button>

        <div className="vr" />
        <Navbar.Text className="justify-content-end">Disconnect</Navbar.Text>
        <Button
          onClick={handleDisconnect}
          className="justify-content-end"
          variant="danger"
        >
          Exit
        </Button>
        {/* <button onClick={handleSelectVote}>Connect to Vote</button> */}
      </Stack>
    </Navbar>
  );
}

export default VotesBanner;
