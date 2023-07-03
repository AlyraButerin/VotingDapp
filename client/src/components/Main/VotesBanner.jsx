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
<Container className= "flex" style = {{paddig: "60px"}}>
      <Row xs={1} md={5}>
      <Col>
        
        </Col>
        <Col>
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

        </Col>
   </Row>
        </Container>
  );
}

export default VotesBanner;
