/*
@name: voteState.js
@description: state management of the vote context
*/

/*
@notice : action types to manipulate the state of the vote context
@todo : rename
*/
const actions = {
  init: "INIT",
  resetCurrentVote: "RESET",
  addNewVote: "ADD_VOTE",
  loadVote: "LOAD_VOTE",
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
};
/*
@notice : reset state of the vote context
*/
const resetSate = {
  contractAddressIndex: null,
  contract: null,
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
      const contractAddressIndex = deployedAddresses.length - 1;
      const contract = data.contract;
      const nexData = { deployedAddresses, contractAddressIndex, contract };
      return { ...voteState, ...nexData };
    }
    case actions.loadVote:
      const contract = data.contract;
      const contractAddressIndex = voteState.deployedAddresses.indexOf(
        data.contract.options.address
      );
      const nexData = { contractAddressIndex, contract };
      return { ...voteState, ...nexData };

    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
