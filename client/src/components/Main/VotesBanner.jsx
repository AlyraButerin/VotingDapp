import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";

import { Col, Row, Container, Stack, Button, Form } from "react-bootstrap";

function VotesBanner() {
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
    <Container
      fluid
      className="bg-body-tertiary pt-3"
      style={{ backgroundColor: "#dce9ef", height: "10vh" }}
    >
      <Row>
        <Col>
          <Stack direction="horizontal" gap={5}>
            <label>Select a vote</label>
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
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={5}>
            <div className="vr" />
            <label className="d-flex justify-content-center">
              Create a new vote
            </label>
            <Button onClick={handleCreateVote} variant="warning">
              Deploy
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default VotesBanner;
