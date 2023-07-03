import useVote from "../../contexts/VoteContext/useVote";
import AdminActions from "./AdminActions";
import VoterActions from "./VoterActions";
import Container from "react-bootstrap/Container";
/*
@dev :  <ActionsBanner /> is a component of <Main />.
will be used to manage all actions
*/
function ActionsBanner({ setIsVoteTallied }) {
  const { createVote, voteState } = useVote();

  /**
   * @dev : creation of a new vote
   * @todo : add confirmation/ error message and update voteadd selector
   */
  const handleCreateVote = async () => {
    await createVote();
  };

  return (
    <Container style = {{backgroundColor: "#91bbd1"}}>
      <>
        {voteState.isAdmin ? (
          <AdminActions setIsVoteTallied={setIsVoteTallied} />
        ) : null}
        {voteState.isVoter ? <VoterActions /> : null}
      </>
    </Container>
  );
}

export default ActionsBanner;
