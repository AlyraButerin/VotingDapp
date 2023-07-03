import useConnection from "../../contexts/ConnectionContext/useConnection";
import { chainIdToName, toShortAddress } from "../../utils/connectionUtils";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";


/*
@dev : display the wallet accounts and the network chainId
@todo : DEMO VERSION ADD ELEMENTS, REFACTORING
*/
function NetworkBanner() {
  const { wallet, hasProvider, handleConnect, handleDisconnect } = useConnection();

  
  return (


    <Navbar style = {{backgroundColor: "#3286aa", color:"white"}}>   
      <Container>
      <Navbar.Collapse className="justify-content-left">
          <Navbar.Text>
          Wallet Account: {toShortAddress(wallet?.accounts[0])}
          </Navbar.Text>
        </Navbar.Collapse>
        

        <Navbar.Collapse className="justify-content-center">
        <Button onClick={handleDisconnect} variant="danger">Disconnect/return</Button>
        </Navbar.Collapse>
        
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Chain Id: {chainIdToName(wallet?.chainId)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NetworkBanner;
