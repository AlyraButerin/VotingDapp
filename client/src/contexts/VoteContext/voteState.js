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
  let nextData = {};
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
      const contractAddressIndex = deployedAddresses.length - 1;
      const contract = data.contract;
      const isAdmin = true; //RETIRER / POUR TEST
      const isVoter = data.isVoter; //RETIRER / POUR TEST
      const nexData = {
        deployedAddresses,
        contractAddressIndex,
        contract,
        // isAdmin,
        // isVoter, //RETIRER / POUR TEST
      };
      return { ...voteState, ...nexData };
    }
    case actions.loadVote:
      const contract = data.contract;
      const contractAddressIndex = voteState.deployedAddresses.indexOf(
        data.contract.options.address
      );
      const isAdmin = data.isAdmin;
      const isVoter = data.isVoter;
      const workflowIndex = data.workflowIndex;
      const nexData = {
        contractAddressIndex,
        contract,
        isAdmin,
        isVoter,
        workflowIndex,
      };
      return { ...voteState, ...nexData };
    case actions.updateVote:
      // const isAdmin = data.isAdmin;
      // const isVoter = data.isVoter;
      // const workflowIndex = data.workflowIndex;
      nextData = {
        isAdmin: data.isAdmin,
        isVoter: data.isVoter,
        workflowIndex: data.workflowIndex,
      };
      return { ...voteState, ...nextData };

    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
