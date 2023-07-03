import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/esm/Container';

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
<Container className= "flex" style = {{paddig: "60px"}}>
      <Row xs={1} md={5}>
      <Col>
        
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
          Connecter
        </Button>
        </Col>
   <Col>
        <h5>
          Create a new vote
        </h5>
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
