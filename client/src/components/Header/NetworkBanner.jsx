import useConnection from "../../contexts/ConnectionContext/useConnection";

/*
@dev : display the wallet accounts and the network chainId
@todo : DEMO VERSION ADD ELEMENTS, REFACTORING
*/
function NetworkBanner() {
  const { wallet, hasProvider, handleConnect } = useConnection();
  return (
    <div
      className="NetworkBanner"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <label>Wallet Accounts: {wallet?.accounts[0]}</label>

      <h5 style={{ display: "inline" }}>Network Banner</h5>

      <label>Hex ChainId: {wallet?.chainId}</label>
    </div>
  );
}

export default NetworkBanner;
