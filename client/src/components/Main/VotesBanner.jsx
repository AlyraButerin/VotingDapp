import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";

function VotesBanner() {
  const { voteState, connectToVote, createVote } = useVote();
  const [select, setSelect] = useState(null);
  const [setDeployedAddresses] = useState([]);

  const handleSelectVote = () => {
    console.log("handleSelectVote", select);
    connectToVote(select);
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

  return (
    <Navbar className="bg-body-tertiary">
      <Stack direction="horizontal" gap={5}>
        <Navbar.Text>Select a vote</Navbar.Text>
        <Form.Select
          onChange={(e) => {
            const address = voteState.deployedAddresses.find(
              (address) => address === e.target.value
            );

            setSelect(address);
          }}
          style={{ width: "350px" }}
        >
          {voteState?.deployedAddresses.length > 0
            ? voteState?.deployedAddresses.map((address, index) => (
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
      </Stack>
    </Navbar>
  );
}

export default VotesBanner;
