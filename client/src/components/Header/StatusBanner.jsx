import useVote from "../../contexts/VoteContext/useVote";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
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
    <Navbar style={{ backgroundColor: "#91bbd1", color: "white" }}>
      <Container>
        <Navbar.Collapse className="justify-content-left">
          <Navbar.Text>Connected to Vote : {getVoteAddress()}</Navbar.Text>

        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Vote Status: {getVoteStatus()}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StatusBanner;
