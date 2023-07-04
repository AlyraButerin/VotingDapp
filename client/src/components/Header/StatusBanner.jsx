import useVote from "../../contexts/VoteContext/useVote";
import { Col, Row } from "react-bootstrap";
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
    <footer style={{ backgroundColor: "#91bbd1", color: "white" }}>
      <Row>
        <Col>
          <label className="p-1">Connected to Vote : </label>
          <label> {getVoteAddress()}</label>
        </Col>

        <Col xs={4} style={{ textAlign: "end" }}>
          <labe className="p-1">Vote Status :</labe>
          <label className="pe-1"> {getVoteStatus()}</label>
        </Col>
      </Row>
    </footer>
  );
}

export default StatusBanner;
