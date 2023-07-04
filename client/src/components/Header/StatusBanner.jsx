import useVote from "../../contexts/VoteContext/useVote";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row, Stack } from "react-bootstrap";
import { workflowToString } from "../../utils/voteUtils";

function StatusBanner() {
  const { voteState } = useVote();

  const getVoteAddress = () => {
    if (
      voteState?.deployedAddresses.length > 0 &&
      voteState.contractAddressIndex !== null
    ) {
      return voteState?.deployedAddresses[voteState.contractAddressIndex];
    } else {
      return "none";
    }
  };

  const getVoteStatus = () => {
    if (voteState?.workflowIndex !== null) {
      return workflowToString(voteState?.workflowIndex);
    } else {
      return "none";
    }
  };

  return (
    // <Navbar style={{ backgroundColor: "#91bbd1", color: "white" }}>
    //   <Container>
    //     <Navbar.Collapse className="justify-content-left">
    //       <Navbar.Text>Connected to Vote : {getVoteAddress()}</Navbar.Text>

    //     </Navbar.Collapse>

    //     <Navbar.Collapse className="justify-content-end">
    //       <Navbar.Text>Vote Status: {getVoteStatus()}</Navbar.Text>

    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <footer style={{ backgroundColor: "#91bbd1", color: "white" }}>
      {/* <Stack direction="horizontal justify-content-between" fluid> */}
      <Row>
        {/* <Container> */}
        {/* <div className="justify-content-left"> */}
        {/* <Col> style={{ justifyContent: "left" }}> */}
        <Col>
          <label className="p-1">Connected to Vote : </label>
          <label> {getVoteAddress()}</label>
        </Col>

        <Col
          xs={4}
          // className="justify-content-end "
          style={{ textAlign: "end" }}
        >
          <labe className="p-1">Vote Status :</labe>
          <label className="pe-1"> {getVoteStatus()}</label>
        </Col>
        {/* </Container> */}
      </Row>
      {/* </Stack> */}
    </footer>
  );
}

export default StatusBanner;
