import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import VoteContext from "./VoteContext";
import { reducer, actions, initialState } from "./voteState";
import useConnection from "../ConnectionContext/useConnection";

/**
 * @dev : install @metamask/detect-provider => npm install @metamask/detect-provider
 * @notice : Provider to manage the vote contract and deployed addresses
 * @dev : a first loading will init data with abi, bytecode, default deployed add
 * @dev : after init you can connect to a voteAdd or create a new one
 * @dev : when choosing a voteAdd, you always need to 'connect to this vote' to load infos and make actions available
 * @param { any } children
 * @return : children wrapped by VoteContext.Provider
 * @todo : ADD ERR CHECKS AND MANAGEMENT (needed for all providers)
 * @todo : MAKE IT MORE GENERIC and detach infos
 */
function VoteProvider({ children }) {
  const { wallet } = useConnection();
  const [voteState, dispatch] = useReducer(reducer, initialState);

  /**
   * @dev : create a new vote contract add it to the voteState, and set the current contract to the new one
   * @params : none
   * @todo : CHANGE send params, ADD CHECKS
   * @todo : MOVE TO TXCONTEXT !!!
   */
  const createVote = async () => {
    const { abi, bytecode } = voteState;
    const newContract = new voteState.web3.eth.Contract(abi);
    const newContractInstance = await newContract
      .deploy({
        data: bytecode,
        arguments: [],
      })
      .send({
        from: wallet.accounts[0],
        gas: 3000000, //1500000
        gasPrice: "30000000000000",
      });
    const address = newContractInstance.options.address;

    dispatch({
      type: actions.addNewVote,
      data: {
        contractAddress: address,
        contract: newContractInstance,
        // isVoter, //A RETIRER => TEST SEuLEMENT
      },
    });

    console.log("(VoteProvider)/new vote deployed, address : ", address);
  };

  /**
   * @dev : get infos from the contract regarding the current user
   * @dev : return values are null if there's a pb during the call
   * @param { object } contract
   * @return : { isAdmin, isVoter, workflowIndex }
   */
  const getContractInfos = async (contract) => {
    /*at the moment : null/ture/false, if null pb when fetching the info*/
    let isAdmin, isVoter, workflowIndex;
    await contract.methods
      .owner()
      .call({ from: wallet.accounts[0] })
      .then((result) => {
        isAdmin = result.toLowerCase() === wallet.accounts[0];
      });
    try {
      const result = await contract.methods
        .getVoter(wallet.accounts[0])
        .call({ from: wallet.accounts[0] });
      isVoter = result.isRegistered;
    } catch (err) {
      console.log(
        "(VoteProvider)/getInfos : voter : reverted => not registered"
      ); // console.err("(VoteProvider)/getInfos : voter",err);
    }
    await contract
      .getPastEvents("WorkflowStatusChange", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then(function (events) {
        workflowIndex = 0;
        if (events.length > 0) {
          const lastEvent = events[events.length - 1];
          workflowIndex = lastEvent.returnValues.newStatus;
        }
      });

    console.log(
      "(VoteProvider)/getContractInfos : ",
      isAdmin,
      isVoter,
      workflowIndex
    );

    return { isAdmin, isVoter, workflowIndex };
  };

  const updateContractInfos = async (contract) => {
    const infos = await getContractInfos(contract);
    dispatch({
      type: actions.updateVote,
      data: {
        isAdmin: infos.isAdmin,
        isVoter: infos.isVoter,
        workflowIndex: infos.workflowIndex,
      },
    });
    console.log("UPDAT VOTE CALLED VOTE PROVIFER msg");
  };

  /**
   * @notice : ALWAYS NEED TO CONNECT TO A VOTE CONTRACT BEFORE DOING ANYTHING
   * @dev : connect to an existing vote contract and set the current contract to the new one
   * @param { string } addressToConnect
   *
   * @todo : TEST with testnet ??> also first add in network since migrate
   */
  const connectToVote = async (addressToConnect) => {
    if (addressToConnect) {
      const { abi, web3 } = voteState;
      let contract, isAdmin, isVoter, workflowIndex;

      try {
        contract = new web3.eth.Contract(abi, addressToConnect);

        const infos = await getContractInfos(contract);
        isAdmin = infos.isAdmin;
        isVoter = infos.isVoter;
        workflowIndex = infos.workflowIndex;
      } catch (err) {
        console.error(err);
      }
      console.log(
        "(VoteProvider)/ConnectToVot infos loaded : c,a,v,w:",
        contract,
        isAdmin,
        isVoter,
        workflowIndex
      );
      dispatch({
        type: actions.loadVote,
        data: {
          contract,
          isAdmin,
          isVoter,
          workflowIndex,
        },
      });
    }
  };

  /**
   * @dev : init the voteState with the artifact and set the current contract to the first deployed one
   * @param { object } artifact
   */
  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      // const accounts = wallet.accounts[0];
      const networkID = await web3.eth.net.getId();
      console.log("networkID", networkID);
      const { abi, bytecode } = artifact;
      let address, contract;

      //@todo : truffle ok / TEST with testnet ??> also first add in network since migrate
      try {
        address = artifact?.networks[networkID]?.address;
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: {
          abi,
          bytecode,
          web3,
          deployedAddresses: [address],
          contractAddressIndex: 0,
          contract,
        },
      });
      console.log("(VoteProvider)/ init voteState : ", voteState);
    }
  }, []);

  /**
   * @dev : init the voteState with the artifact
   * @notice : it's run only once at the first render
   */
  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json"); //SimpleStorage.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
    console.log("(VoteProvider)/useEffect", voteState);
  }, []); //[init]);

  /**
   * @dev : watcher on voteState changes
   * @todo : TO REMOVE AT THE END
   */
  useEffect(() => {
    console.log(
      "(VoteProvier)/ useEffect watching voteState changes : ",
      voteState
    );
  }, [voteState]);

  return (
    <VoteContext.Provider
      value={{
        createVote,
        connectToVote,
        updateContractInfos,
        voteState,
        dispatch,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
}

export default VoteProvider;
