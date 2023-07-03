import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

function VotesBanner() {
  const { voteState, connectToVote, createVote } = useVote();
  const [select, setSelect] = useState(null);
  const [setDeployedAddresses] = useState([]);

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

  return (
    <Container className="container-fluid p-0" style={{ paddingTop: "60px", height: "70px" }}>
      <br/>
      <Row xs={12} md={8}>
        <Col>
        <Form.Label>Votes Deployed : </Form.Label>
        </Col>
        <Col>
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
        </Col>
        <Col>
          <Button onClick={handleSelectVote} variant="primary">
            Connect to Vote
          </Button>
        </Col>
        <Col></Col>
        <Col>
        <Form.Label>Create a new vote</Form.Label>
        </Col>
        <Col>
          <Button
            onClick={handleCreateVote}
            className="justify-content-end"
            variant="warning"
          >
            Deploy
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default VotesBanner;
