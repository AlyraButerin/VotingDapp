import useVote from "../../contexts/VoteContext/useVote";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from "react-bootstrap/Form";

function StatusBanner() {
  const { voteState } = useVote();
    return (
      <Navbar style = {{backgroundColor: "#91bbd1"}}>
      <Container>
      <Navbar.Collapse className="justify-content-left">
          
          {voteState?.deployedAddresses.length > 0 ?
          voteState?.deployedAddresses.map((address, index) => (
            <Form.Label value={address}>
              {"You are connected to Vote : " + address}
              </Form.Label>
          ))
    
           : <div></div>}
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
        <Form.Label>
          Vote Status: 
          </Form.Label>
        </Navbar.Collapse>
        
        
    
      </Container>
    </Navbar>
    );
  }
  
  export default StatusBanner;