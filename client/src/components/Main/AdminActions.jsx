import React, { useEffect, useState } from "react";
import useVote from "../../contexts/VoteContext/useVote";

function AdminActions() {
  const { voteState } = useVote();
  const [whiteList, setWhiteList] = useState([]);
  const [newVoter, setNewVoter] = useState("");

  const handleChange = (e) => {
    setNewVoter(e.target.value);
  };

  //checker taille adresse et validite sinon messgae alerte
  //checker pas deja present
  const handleAddVoter = () => {
    if (newVoter.length !== 42) {
      alert("Please enter a valid address");
      setNewVoter("");
      return;
    }
    if (whiteList.includes(newVoter)) {
      alert("This address is already in the whitelist");
      setNewVoter("");
      return;
    }
    setWhiteList([...whiteList, newVoter]);
  };

  //rempli whitelist avec les adresses du contract en cherchant dans les events
  useEffect(() => {
    const getWhiteList = async () => {
      const list = await voteState.contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const addresses = list.map((event) => event.returnValues.voterAddress);
      setWhiteList(addresses);
    };
    getWhiteList();
  }, [voteState.contract]);

  return (
    <div>
      AdminActions
      <div>
        <select>
          {whiteList && whiteList.length > 0
            ? whiteList.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))
            : null}
        </select>
        <input
          type="text"
          placeholder="Enter a new voter address"
          onChange={handleChange}
        />
        <button onClick={handleAddVoter}>Add voter</button>
      </div>
      <div>
        workflow
        <button>start proposal registration</button>
        <button>End proposal registration</button>
        <button>Start voting session</button>
        <button>End voting session</button>
      </div>
    </div>
  );
}

export default AdminActions;
