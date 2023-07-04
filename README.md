# Voting Dapp Project on React using Truffle Box

## Authors :

ibourn / igor Bournazel

mavy77 / thierno Diallo

## Vercel Link:

https://voting-dapp-gamma.vercel.app/

## Project Board on Github:

https://github.com/orgs/AlyraButerin/projects/1/views/1

## Demo Link:

https://www.loom.com/share/ff0686f5d7fd43dd92d6bae59b764f92

## Description:

This is a job as part of [Alyra’s blockchain developer training](https://www.alyra.fr/)

The project is a decentralized application based on Ethereum .
The Dapp can be used by an organization to organize elections with voters who submit proposals to vote.

-**The base contract of the exercise had a breach** : details of the corrections are in the contract comments

-**The different features** are as follows:

- The voting administrator registers a whitelist of voters identified by their Ethereum address.
- Voting administrator starts proposal recording session.
- Registered voters are allowed to register their proposals while the registration session is active.
- The voting administrator terminates the proposal recording session.
- The voting administrator starts the voting session.
- Registered voters vote for their preferred proposal.
- The voting administrator ends the voting session.
- The voting administrator counts the votes.
- Everyone can check the final details of the winning proposal.

-**As extra feature** : everybody can deploy a new vote (he became admin of the new vote)

-**usage** : you NEED to connect to a contract address ('connect' button) before interacting with the vote

## Technologies used:

- **React**
- **Truffle & web3.js**
- **Vercel**

  ## Setup (commands)

- **Local** (in 3 separate terminals) :
  ganache /
  truffle migrate /
  npm run start

  then connect metamask and import one address provided by ganache to interact with the contract

- **Goerli** : connect metamask

First Goerli deployment address : 0x85A5E15e2348eB5d6c808364a01CBafE26a58dDe

## The Workflow:

The Voting process follows some steps:
(It may be buggy for the default contract, in this case, deploy a new one and connect to it)

- Registering Voters,
- Proposals Registration (Start and Stop),
- Voting Session (Start and Stop),
- Votes are tallied when admin click 'End Voting Session'
