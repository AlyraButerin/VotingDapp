import useVote from "../../contexts/VoteContext/useVote";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function StatusBanner() {
  const { } = useVote();
    return (
      <Navbar className="bg-body-tertiary">
      <Container>
      <Navbar.Collapse className="justify-content-left">
          <Navbar.Text>
          Connected to Vote : 
          </Navbar.Text>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          Vote Status: 
          </Navbar.Text>
        </Navbar.Collapse>
        
        
    
      </Container>
    </Navbar>
    );
  }
  
  export default StatusBanner;