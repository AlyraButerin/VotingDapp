/*
@name: voteState.js
@description: state management of the vote context
@updated : add isAdmin and isVoter
*/

/*
@notice : action types to manipulate the state of the vote context
@todo : rename and refactor
*/
const actions = {
  init: "INIT",
  resetCurrentVote: "RESET",
  addNewVote: "ADD_VOTE",
  loadVote: "LOAD_VOTE",
  updateVote: "UPDATE_VOTE",
};

/*
@notice : initial state of the vote context 
*/
const initialState = {
  abi: null,
  bytecode: null,
  web3: null,
  deployedAddresses: [],
  contractAddressIndex: null,
  contract: null,
  isAdmin: false,
  isVoter: false,
  workflowIndex: null,
};
/*
@notice : reset state of the vote context
*/
const resetSate = {
  contractAddressIndex: null,
  contract: null,
  isAdmin: false,
  isVoter: false,
  workflowIndex: null,
};

/*
@notice : reducer to manipulate the state of the vote context
@dev : via useVote hook we can access to the state and dispatch actions
@params : voteState : current state of the vote context 
@params : action : action to dispatch (type, payload)
@todo : refactor
*/
const reducer = (voteState, action) => {
  const { type, data } = action;

  switch (type) {
    case actions.init:
      return { ...voteState, ...data };
    case actions.reset:
      return { ...voteState, ...resetSate };
    case actions.addNewVote: {
      const deployedAddresses = [
        ...voteState.deployedAddresses,
        data.contractAddress,
      ];

      const addData = {
        deployedAddresses,
        contractAddressIndex: deployedAddresses.length - 1,
        contract: data.contract,
      };
      return { ...voteState, ...addData };
    }
    case actions.loadVote:
      const contractAddressIndex = voteState.deployedAddresses.indexOf(
        data.contract.options.address
      );

      const loadData = {
        contractAddressIndex,
        contract: data.contract,
        isAdmin: data.isAdmin,
        isVoter: data.isVoter,
        workflowIndex: data.workflowIndex,
      };
      return { ...voteState, ...loadData };
    case actions.updateVote:
      const freshData = {
        isAdmin: data.isAdmin,
        isVoter: data.isVoter,
        workflowIndex: data.workflowIndex,
      };
      return { ...voteState, ...freshData };

    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
