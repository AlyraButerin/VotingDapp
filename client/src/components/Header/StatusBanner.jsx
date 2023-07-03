import useVote from "../../contexts/VoteContext/useVote";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function StatusBanner() {
  const { voteState } = useVote();
    return (
      <Navbar style = {{backgroundColor: "#91bbd1", color:"white"}}>
      <Container>
      <Navbar.Collapse className="justify-content-left">
          

          {voteState?.deployedAddresses.length > 0 ?
          voteState?.deployedAddresses.map((address, index) => (
            <Navbar.Text value={address}>
              {"You are connected to Vote : " + address}
              </Navbar.Text>
          ))

           
      
          
           : <div></div>}
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