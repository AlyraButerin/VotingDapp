import useVote from "../../contexts/VoteContext/useVote";
import AdminActions from "./AdminActions";
import VoterActions from "./VoterActions";
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
    <div className="ActionsBannerBanner">
      <>
        {voteState.isAdmin ? (
          <AdminActions setIsVoteTallied={setIsVoteTallied} />
        ) : (
          <div>Not Admin</div>
        )}
        {voteState.isVoter ? <VoterActions /> : <div>Not Voter</div>}
      </>
    </div>
  );
}

export default ActionsBanner;
