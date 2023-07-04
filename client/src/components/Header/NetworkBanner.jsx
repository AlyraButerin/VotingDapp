import useConnection from "../../contexts/ConnectionContext/useConnection";
import { chainIdToName, toShortAddress } from "../../utils/connectionUtils";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

/*
@dev : display the wallet accounts and the network chainId
@todo : DEMO VERSION ADD ELEMENTS, REFACTORING
@todo : REMOVE NAVBAR !!! => header of header
*/
function NetworkBanner() {
  const { wallet, handleDisconnect } = useConnection();

  return (
    <Navbar style={{ backgroundColor: "#3286aa", color: "white" }}>
      <Container>
        <Navbar.Collapse className="justify-content-left">
          <Form.Label>
            Wallet Account: {toShortAddress(wallet?.accounts[0])}
          </Form.Label>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Button onClick={handleDisconnect} variant="danger">
            Disconnect/return
          </Button>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Form.Label>Chain Id: {chainIdToName(wallet?.chainId)}</Form.Label>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NetworkBanner;
