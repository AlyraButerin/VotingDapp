import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import VoteContext from "./VoteContext";
import { reducer, actions, initialState } from "./voteState";
import useConnection from "../ConnectionContext/useConnection";

/*
@dev : install @metamask/detect-provider => npm install @metamask/detect-provider
@notice : Provider to manage the vote contract and deployed addresses
@params : children
@return : children wrapped by VoteContext.Provider
*/
function VoteProvider({ children }) {
  const { wallet } = useConnection();
  const [voteState, dispatch] = useReducer(reducer, initialState);

  /*
  @dev : create a new vote contract add it to the voteState, and set 
  the current contract to the new one
  @params : none
  @todo : CHANGE send params, ADD CHECKS
  */
  const createVote = async () => {
    const { abi, bytecode } = voteState;
    const newContract = new voteState.web3.eth.Contract(abi);
    const newContractInstance = await newContract
      .deploy({
        data: bytecode, //"0x0" + bytecode, //bytecode,
        arguments: [],
      })
      .send({
        from: wallet.accounts[0],
        gas: 3000000, //1500000
        gasPrice: "30000000000000",
      });
    const address = newContractInstance.options.address;

    /*
     *
     *
     * MODIF CODE ICI
     * test voter
     *
     */
    await newContractInstance.methods
      .addVoter(wallet.accounts[0])
      .send({ from: wallet.accounts[0] });
    const getVoter = await newContractInstance.methods
      .getVoter(wallet.accounts[0])
      .call({ from: wallet.accounts[0] });
    console.log("RENVOI STRUCT ICI/n/n!!!!!!!isVoter", getVoter);
    let isVoter = getVoter.isRegistered;
    /*
     *
     *
     * MODIF CODE ICI
     *
     *
     */

    dispatch({
      type: actions.addNewVote,
      data: {
        contractAddress: address,
        contract: newContractInstance,
        isVoter, //A RETIRER => TEST SEuLEMENT
      },
    });

    console.log("(VoteProvider)/new vote deployed, address : ", address);
  };

  /*
  @dev : connect to an existing vote contract and set the current contract to the new one
  @params : addressToConnect
  */
  const connectToVote = async (addressToConnect) => {
    if (addressToConnect) {
      const { abi, web3 } = voteState;
      let contract, isAdmin, isVoter, admin;
      //truffle ok mais testnet ??> aussi premiere add ds network vu que migrate
      try {
        contract = new web3.eth.Contract(abi, addressToConnect);

        /*
         *
         *
         * MODIF CODE ICI
         *
         *
         */

        admin = await contract.methods
          .owner()
          .call({ from: wallet.accounts[0] });
        isAdmin = admin.toLowerCase() === wallet.accounts[0];
        console.log(
          "(VoteProvider)/connect to vote admin / acc0 : ",
          admin.toLowerCase(),
          wallet.accounts[0]
        );
        // isAdmin = admin == wallet.accounts[0];
        console.log("(VoteProvider)/connect to vote isAdmin : ", isAdmin);
        // isVoter = await contract.methods
        //   .getVoter(wallet.accounts[0])
        //   .call({ from: wallet.accounts[0] });

        contract
          .getPastEvents("VoterRegistered", {
            filter: { address: wallet.accounts[0] },
            fromBlock: 0,
            toBlock: "latest",
          })
          .then((events) => {
            console.log("EVENTS", events);
            isVoter = events.length > 0;
            console.log("(VoteProvider)/connect to vote isVoter : ", isVoter);
          })
          .catch((err) => console.error(err));

        /*
         *
         *
         * MODIF CODE ICI
         *
         *
         */
      } catch (err) {
        console.error(err);
      }
      console.log("(VoteProvider)/connect to vote : ", contract);
      dispatch({
        type: actions.loadVote,
        data: {
          contract,
          isAdmin,
          isVoter,
        },
      });
      console.log("(VoteProvider)/connect to vote : ", voteState);
    }
  };

  /*
  @dev : init the voteState with the artifact and set the current contract to the first deployed one
  @params : artifact
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

  /*
  @dev : init the voteState with the artifact
  @notice : it's run only once at the first render
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

  /*
  @dev : watcher on voteState changes
  @todo : TO REMOVE AT THE END
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
        voteState,
        dispatch,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
}

export default VoteProvider;
