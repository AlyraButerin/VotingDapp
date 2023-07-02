module.exports = {
  workflowToString: function (workflowIndex) {
    switch (workflowIndex) {
      case 0:
        return "RegisteringVoters";
      case 1:
        return "ProposalsRegistrationStarted";
      case 2:
        return "ProposalsRegistrationEnded";
      case 3:
        return "VotingSessionStarted";
      case 4:
        return "VotingEndedAndTallied";
      default:
        return "Unknown";
    }
  },
};
