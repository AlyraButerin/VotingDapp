import { useContext } from "react";
import VoteContext from "./VoteContext";

/*
@dev useVote() is a custom hook that returns the value of the VoteContext.
It is used in the components to access the value of the VoteContext.
*/
const useVote = () => useContext(VoteContext);

export default useVote;
