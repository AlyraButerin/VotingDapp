import useVote from "../../contexts/VoteContext/useVote";
import AdminActions from "./AdminActions";
import VoterActions from "./VoterActions";
/*
@dev :  <ActionsBanner /> is a component of <Main />.
will be used to manage all actions
*/
function ActionsBanner() {
  const { createVote, voteState } = useVote();

  /*
  @dev : creation of a new vote
  */
  const handleCreateVote = async () => {
    await createVote();
  };

  return (
    <div className="ActionsBannerBanner">
      <>
        {voteState.isAdmin ? <AdminActions /> : null}
        {voteState.isVoter ? <VoterActions /> : null}
      </>
      <center>
        <h5>Actions Banner</h5>
      </center>
      <button onClick={handleCreateVote}>Create New Vote</button>
    </div>
  );
}

export default ActionsBanner;
