import React from "react";
import { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";
import useConnection from "../../contexts/ConnectionContext/useConnection";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

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
    // <Navbar className="bg-body-tertiary p-5" style={{backgroundColor: "#dce9ef"}}>
    //   <Stack direction="horizontal" gap={5}>
    //     <Navbar.Text>Select a vote</Navbar.Text>
    //     <Form.Select
    //       onChange={(e) => {
    //         const address = deployedAddresses.find(
    //           (address) => address === e.target.value
    //         );
    //         setSelect(address);
    //       }}
    //       style={{ width: "350px" }}
    //     >
    //       {deployedAddresses.length > 0
    //         ? deployedAddresses.map((address, index) => (
    //             <option key={index} value={address}>
    //               {address}
    //             </option>
    //           ))
    //         : null}
    //     </Form.Select>
    //     <Button onClick={handleSelectVote} variant="primary">
    //       Connecter
    //     </Button>

    //     <div className="vr" />
    //     <Navbar.Text className="justify-content-end">
    //       Create a new vote
    //     </Navbar.Text>
    //     <Button
    //       onClick={handleCreateVote}
    //       className="justify-content-end"
    //       variant="warning"
    //     >
    //       Deploy
    //     </Button>

    //     <div className="vr" />
    //     <Navbar.Text className="justify-content-end">Disconnect</Navbar.Text>
    //     <Button
    //       onClick={handleDisconnect}
    //       className="justify-content-end"
    //       variant="danger"
    //     >
    //       Exit
    //     </Button>
    //     {/* <button onClick={handleSelectVote}>Connect to Vote</button> */}
    //   </Stack>
    // </Navbar>
    <Container
      fluid
      className="bg-body-tertiary pt-3"
      style={{ backgroundColor: "#dce9ef", height: "10vh" }}
    >
      {/* <Stack direction="horizontal" gap={5}> */}
      <Row>
        <Col>
          {/* <Row> */}
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
          {/* </Row> */}
        </Col>
        {/* <Col className="vr"></Col> */}
        <Col>
          <Stack direction="horizontal" gap={5}>
            <div className="vr" />
            <label
              className="d-flex justify-content-center"
              // style={{ justifyContent: "end" }}
            >
              Create a new vote
            </label>
            <Button
              onClick={handleCreateVote}
              // className="justify-content-end"
              variant="warning"
            >
              Deploy
            </Button>
          </Stack>
        </Col>
      </Row>
      {/* <div className="vr" />
        <Navbar.Text className="justify-content-end">Disconnect</Navbar.Text>
        <Button
          onClick={handleDisconnect}
          className="justify-content-end"
          variant="danger"
        >
          Exit
        </Button> */}
      {/* <button onClick={handleSelectVote}>Connect to Vote</button> */}
      {/* </Stack> */}
    </Container>
  );
}

export default VotesBanner;
