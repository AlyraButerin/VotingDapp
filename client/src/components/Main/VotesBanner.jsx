import React from "react";
import useVote from "../../contexts/VoteContext/useVote";

function VotesBanner() {
  const { voteState } = useVote();

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

  return (
    <div className="VotesBanner">
      <center>
        <h5>Votes Banner</h5>
      </center>
      <label>connected to vote : </label>
      <label>none/address 0x454545</label>
      <label>role (s) : </label>
      <label>{displayRoles()}</label>

      {/* placer ici le bouton selection add / creation de vote */}
    </div>
  );
}

export default VotesBanner;
