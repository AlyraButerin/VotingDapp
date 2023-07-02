import useConnection from "../../contexts/ConnectionContext/useConnection";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/*
@dev : display the wallet accounts and the network chainId
@todo : DEMO VERSION ADD ELEMENTS, REFACTORING
*/
function NetworkBanner() {
  const { wallet, hasProvider, handleConnect } = useConnection();
  return (

    <Navbar className="bg-light">  
      <Container>
      <Navbar.Collapse className="justify-content-left">
          <Navbar.Text>
          Wallet Account: {wallet?.accounts[0]}
          </Navbar.Text>
        </Navbar.Collapse>
        
        
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Chain Id: {wallet?.chainId}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NetworkBanner;
