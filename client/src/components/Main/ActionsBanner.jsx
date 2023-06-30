import useVote from "../../contexts/VoteContext/useVote";

/*
@dev :  <ActionsBanner /> is a component of <Main />.
will be used to manage all actions
*/
function ActionsBanner() {
  const { createVote } = useVote();

  /*
  @dev : creation of a new vote
  */
  const handleCreateVote = async () => {
    await createVote();
  };

  return (
    <div className="ActionsBannerBanner">
      <center>
        <h5>Proposal Banner</h5>
      </center>
      <button onClick={handleCreateVote}>Create New Vote</button>
    </div>
  );
}

export default ActionsBanner;
